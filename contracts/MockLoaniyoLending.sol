// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MockLoaniyoLending
 * @notice A simple mock lending contract that returns sample data for testing
 */
contract MockLoaniyoLending {
    address public immutable token;
    
    // Sample data for testing
    uint256 public constant MOCK_TOTAL_SUPPLY = 1000000 * 10**6; // 1M USDC
    uint256 public constant MOCK_TOTAL_BORROW = 500000 * 10**6;  // 500K USDC
    uint256 public constant MOCK_SUPPLY_APY = 5 * 10**18;       // 5% APY
    uint256 public constant MOCK_BORROW_APY = 8 * 10**18;       // 8% APY
    
    // User data storage (for demo purposes)
    mapping(address => uint256) public userDeposits;
    mapping(address => uint256) public userBorrows;
    
    // Public variables expected by the ABI
    uint256 public totalDeposits = MOCK_TOTAL_SUPPLY;
    uint256 public totalBorrows = MOCK_TOTAL_BORROW;
    uint256 public interestRate = 500; // 5%
    uint256 public collateralRatio = 15000; // 150%
    
    constructor(address _token) {
        token = _token;
    }
    
    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        userDeposits[msg.sender] += amount;
    }
    
    function withdraw(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(userDeposits[msg.sender] >= amount, "Insufficient balance");
        userDeposits[msg.sender] -= amount;
    }
    
    function borrow(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        userBorrows[msg.sender] += amount;
    }
    
    function repay(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(userBorrows[msg.sender] >= amount, "Repay amount exceeds debt");
        userBorrows[msg.sender] -= amount;
    }
    
    function getUserData(address user) external view returns (
        uint256 deposited,
        uint256 borrowed,
        uint256 accruedInterest,
        uint256 totalOwed,
        uint256 maxBorrow,
        uint256 maxWithdraw
    ) {
        deposited = userDeposits[user];
        borrowed = userBorrows[user];
        accruedInterest = 0;
        totalOwed = borrowed;
        maxBorrow = 100000 * 10**6; // 100k USDC max borrow
        maxWithdraw = deposited;
    }
    
    function getGlobalData() external pure returns (
        uint256 _totalDeposits,
        uint256 _totalBorrows,
        uint256 _availableLiquidity,
        uint256 _utilizationRate,
        uint256 _interestRate
    ) {
        _totalDeposits = MOCK_TOTAL_SUPPLY;
        _totalBorrows = MOCK_TOTAL_BORROW;
        _availableLiquidity = MOCK_TOTAL_SUPPLY - MOCK_TOTAL_BORROW;
        _utilizationRate = 5000; // 50% utilization
        _interestRate = 500;     // 5% interest rate
    }
}
