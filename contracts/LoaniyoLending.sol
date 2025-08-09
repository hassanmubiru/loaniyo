// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoaniyoLending is ReentrancyGuard, Ownable {
    struct User {
        uint256 deposited;
        uint256 borrowed;
        uint256 lastUpdateTime;
        uint256 accruedInterest;
    }
    
    IERC20 public immutable token; // The token being lent/borrowed (e.g., USDC)
    
    mapping(address => User) public users;
    
    uint256 public totalDeposits;
    uint256 public totalBorrows;
    uint256 public interestRate = 500; // 5% annual interest rate (in basis points)
    uint256 public collateralRatio = 15000; // 150% collateralization ratio (in basis points)
    
    uint256 private constant SECONDS_PER_YEAR = 365 * 24 * 60 * 60;
    uint256 private constant BASIS_POINTS = 10000;
    
    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event Borrow(address indexed user, uint256 amount);
    event Repay(address indexed user, uint256 amount);
    
    constructor(address _token) Ownable(msg.sender) {
        token = IERC20(_token);
    }
    
    modifier updateInterest(address user) {
        _updateUserInterest(user);
        _;
    }
    
    function _updateUserInterest(address user) internal {
        User storage userData = users[user];
        if (userData.borrowed > 0 && userData.lastUpdateTime > 0) {
            uint256 timeElapsed = block.timestamp - userData.lastUpdateTime;
            uint256 interest = (userData.borrowed * interestRate * timeElapsed) / (BASIS_POINTS * SECONDS_PER_YEAR);
            userData.accruedInterest += interest;
        }
        userData.lastUpdateTime = block.timestamp;
    }
    
    function deposit(uint256 amount) external nonReentrant updateInterest(msg.sender) {
        require(amount > 0, "Amount must be greater than 0");
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        users[msg.sender].deposited += amount;
        totalDeposits += amount;
        
        emit Deposit(msg.sender, amount);
    }
    
    function withdraw(uint256 amount) external nonReentrant updateInterest(msg.sender) {
        require(amount > 0, "Amount must be greater than 0");
        require(users[msg.sender].deposited >= amount, "Insufficient deposits");
        
        // Check if withdrawal would make user undercollateralized
        uint256 newDeposited = users[msg.sender].deposited - amount;
        uint256 totalOwed = users[msg.sender].borrowed + users[msg.sender].accruedInterest;
        
        if (totalOwed > 0) {
            require(
                newDeposited * BASIS_POINTS >= totalOwed * collateralRatio,
                "Withdrawal would make position undercollateralized"
            );
        }
        
        users[msg.sender].deposited -= amount;
        totalDeposits -= amount;
        
        require(token.transfer(msg.sender, amount), "Transfer failed");
        
        emit Withdraw(msg.sender, amount);
    }
    
    function borrow(uint256 amount) external nonReentrant updateInterest(msg.sender) {
        require(amount > 0, "Amount must be greater than 0");
        require(amount <= getAvailableLiquidity(), "Insufficient liquidity");
        
        User storage userData = users[msg.sender];
        uint256 newBorrowed = userData.borrowed + amount;
        uint256 totalOwed = newBorrowed + userData.accruedInterest;
        
        // Check collateralization
        require(
            userData.deposited * BASIS_POINTS >= totalOwed * collateralRatio,
            "Insufficient collateral"
        );
        
        userData.borrowed += amount;
        totalBorrows += amount;
        
        require(token.transfer(msg.sender, amount), "Transfer failed");
        
        emit Borrow(msg.sender, amount);
    }
    
    function repay(uint256 amount) external nonReentrant updateInterest(msg.sender) {
        require(amount > 0, "Amount must be greater than 0");
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        User storage userData = users[msg.sender];
        uint256 totalOwed = userData.borrowed + userData.accruedInterest;
        require(totalOwed > 0, "No debt to repay");
        
        if (amount >= totalOwed) {
            // Full repayment
            userData.borrowed = 0;
            userData.accruedInterest = 0;
            totalBorrows -= userData.borrowed;
            
            // Refund excess
            if (amount > totalOwed) {
                require(token.transfer(msg.sender, amount - totalOwed), "Refund failed");
            }
        } else {
            // Partial repayment - pay interest first
            if (amount >= userData.accruedInterest) {
                uint256 principalPayment = amount - userData.accruedInterest;
                userData.accruedInterest = 0;
                userData.borrowed -= principalPayment;
                totalBorrows -= principalPayment;
            } else {
                userData.accruedInterest -= amount;
            }
        }
        
        emit Repay(msg.sender, amount);
    }
    
    function getAvailableLiquidity() public view returns (uint256) {
        return totalDeposits >= totalBorrows ? totalDeposits - totalBorrows : 0;
    }
    
    function getUserData(address user) external view returns (
        uint256 deposited,
        uint256 borrowed,
        uint256 accruedInterest,
        uint256 totalOwed,
        uint256 maxBorrow,
        uint256 maxWithdraw
    ) {
        User memory userData = users[user];
        
        // Calculate current accrued interest
        uint256 currentAccruedInterest = userData.accruedInterest;
        if (userData.borrowed > 0 && userData.lastUpdateTime > 0) {
            uint256 timeElapsed = block.timestamp - userData.lastUpdateTime;
            uint256 interest = (userData.borrowed * interestRate * timeElapsed) / (BASIS_POINTS * SECONDS_PER_YEAR);
            currentAccruedInterest += interest;
        }
        
        deposited = userData.deposited;
        borrowed = userData.borrowed;
        accruedInterest = currentAccruedInterest;
        totalOwed = borrowed + accruedInterest;
        
        // Calculate max borrow
        if (deposited * BASIS_POINTS > totalOwed * collateralRatio) {
            maxBorrow = (deposited * BASIS_POINTS - totalOwed * collateralRatio) / collateralRatio;
            uint256 availableLiquidity = getAvailableLiquidity();
            maxBorrow = maxBorrow > availableLiquidity ? availableLiquidity : maxBorrow;
        } else {
            maxBorrow = 0;
        }
        
        // Calculate max withdraw
        if (totalOwed == 0) {
            maxWithdraw = deposited;
        } else {
            uint256 minCollateral = (totalOwed * collateralRatio) / BASIS_POINTS;
            maxWithdraw = deposited > minCollateral ? deposited - minCollateral : 0;
        }
    }
    
    function getGlobalData() external view returns (
        uint256 _totalDeposits,
        uint256 _totalBorrows,
        uint256 _availableLiquidity,
        uint256 _utilizationRate,
        uint256 _interestRate
    ) {
        _totalDeposits = totalDeposits;
        _totalBorrows = totalBorrows;
        _availableLiquidity = getAvailableLiquidity();
        _utilizationRate = totalDeposits > 0 ? (totalBorrows * BASIS_POINTS) / totalDeposits : 0;
        _interestRate = interestRate;
    }
    
    // Owner functions
    function setInterestRate(uint256 _interestRate) external onlyOwner {
        require(_interestRate <= 5000, "Interest rate too high"); // Max 50%
        interestRate = _interestRate;
    }
    
    function setCollateralRatio(uint256 _collateralRatio) external onlyOwner {
        require(_collateralRatio >= 10000, "Collateral ratio too low"); // Min 100%
        collateralRatio = _collateralRatio;
    }
}
