export const Menu = [
  // {
  //   id: "Dashboard",
  //   icon: "fas fa-desktop",
  //   label: "Dashboard",
  //   to: "/dashboard",
  //   badge: "no",
  // },
  {
    id: "Master Data",
    icon: "fas fa-cog",
    label: "Master Data",
    badge: "no",
    subs: [
      {
        id: "CMS",
        icon: "",
        label: "CMS",
        to: "/cms",
        badge: "no",
      },
      {
        id: "expense-category",
        icon: "",
        label: "Expense Category",
        to: "/expense-category",
        badge: "no",
      },
      {
        id: "gl-accounts",
        icon: "",
        label: "GL Accounts",
        to: "/gl-accounts",
        badge: "no",
      },
      {
        id: "accounts-master",
        icon: "",
        label: "Accounts Group",
        to: "/accounts-group",
        badge: "no",
      },
      {
        id: "area",
        icon: "",
        label: "Area",
        to: "/area",
        badge: "no",
      },
      {
        id: "level",
        icon: "",
        label: "Level",
        to: "/level",
        badge: "no",
      },
      {
        id: "paymentMode",
        icon: "",
        label: "Payment Mode",
        to: "/payment-mode",
        badge: "no",
      },
      {
        id: "assetCategory",
        icon: "",
        label: "Asset Category",
        to: "/asset-category",
        badge: "no",
      },
      {
        id: "Role",
        icon: "",
        label: "Role",
        to: "/role",
        badge: "no",
      },
      {
        id: "employeeDepartment",
        icon: "",
        label: "Employee Department",
        to: "/employee-department",
        badge: "no",
      },
      {
        id: "Religion",
        icon: "",
        label: "Religion",
        to: "religion-crud",
        badge: "no",
      },
      {
        id: "Division",
        icon: "",
        label: "Division",
        to: "/division",
        badge: "no",
      },
      {
        id: "SubDivision",
        icon: "",
        label: "Sub-Division",
        to: "/sub-division",
        badge: "no",
      },
      {
        id: "Branch",
        icon: "",
        label: "Branch",
        to: "/branch",
        badge: "no",
      },
    ],
  },
  {
    id: "Society",
    icon: "fas fa-users",
    label: "Society",
    badge: "no",
    subs: [
      {
        id: "society-registration",
        icon: "",
        label: "Society Registration",
        to: "/society-registration",
        badge: "no",
      },
      {
        id: "society-Settings",
        icon: "",
        label: "Society Settings",
        to: "/society-setting",
        badge: "no",
      },

      {
        id: "jewel-loan-Settings",
        icon: "",
        label: "Jewel Loan Settings",
        to: "/jewel-loan-setting",
        badge: "no",
      },
    ],
  },
  {
    id: "member-management",
    icon: "",
    label: "Member Management",
    to: "/member-management",
    badge: "no",
    subs: [
      {
        id: "member-management",
        icon: "",
        label: "Member Management",
        to: "/member-management",
        badge: "no",
      },
      {
        id: "member-registration",
        icon: "",
        label: "Member Registration",
        to: "/member-registration",
        badge: "no",
      },
      {
        id: "Member-update",
        icon: "",
        label: "Member Salary Structure Update",
        to: "/salary-structure",
        badge: "no",
      },
      {
        id: "surety-update",
        icon: "",
        label: "Surety Update",
        to: "/surety-update",
        badge: "no",
      },
      {
        id: "member-settlement",
        icon: "",
        label: "Member Settlement",
        to: "/member-settlement",
        badge: "no",
      },
      {
        id: "member-ledger",
        icon: "",
        label: "Member Ledger",
        to: "/member-ledger",
        badge: "no",
      },
      {
        id: "member-journal",
        icon: "",
        label: "Member Journal",
        to: "/member-journal",
        badge: "no",
      },
    ],
  },
  {
    id: "Deposits",
    icon: "fas fa-file",
    label: "Deposits",
    badge: "no",
    subs: [
      {
        id: "Deposits",
        icon: "",
        label: "Deposits",
        to: "/deposits",
        badge: "no",
      },
      {
        id: "DepositsList",
        icon: "",
        label: "Deposits List",
        to: "/deposit-list",
        badge: "no",
      },
      {
        id: "deposit-disbursement",
        icon: "",
        label: "Deposit Interest Disbursement",
        to: "/deposit-disbursement",
        badge: "no",
      },
      {
        id: "loan-on-deposit",
        icon: "",
        label: "Loan on Deposit",
        to: "/loan-on-deposit",
        badge: "no",
      },
      {
        id: "AmountDeposit",
        icon: "",
        label: "Amount Deposit",
        to: "/amount-deposit",
        badge: "no",
      },
      {
        id: "AmountWithdrawal",
        icon: "",
        label: "Amount Withdrawal",
        to: "/amount-withdraw",
        badge: "no",
      },
    ],
  },
  {
    id: "Loan",
    icon: "fas fa-file",
    label: "Loan",
    badge: "no",
    subs: [
      { id: "Loan", icon: "", label: "Loans", to: "/loan", badge: "no" },
      {
        id: "Loan-application",
        icon: "",
        label: "Loan Application",
        to: "/loan-application",
        badge: "no",
      },
      {
        id: "Loan-disbursement-register",
        icon: "",
        label: "Loan Disbursement Register",
        to: "/loan-disbursement",
        badge: "no",
      },
      {
        id: "festival-loan",
        icon: "",
        label: "Festival Loan",
        to: "/festival-loan",
        badge: "no",
      },
    ],
  },
  {
    id: "Demand",
    icon: "fas fa-file",
    label: "Demand",
    badge: "no",
    subs: [
      {
        id: "DemandGeneration",
        icon: "",
        label: "Demand Generation",
        to: "/demand-generation",
        badge: "no",
      },
      {
        id: "DemandGeneration-2",
        icon: "",
        label: "Demand Generation - 2 ( Detailed Member View )",
        to: "/detailed-member-view",
        badge: "no",
      },
      {
        id: "DemandRecovery",
        icon: "",
        label: "Demand Recovery",
        to: "/demand-recovery",
        badge: "no",
      },
    ],
  },
  // {
  //   id: "Finance & Accounts",
  //   icon: "fas fa-file",
  //   label: "Finance & Accounts",
  //   badge: "no",
  //   subs: [
  //     {
  //       id: "voucher-entry",
  //       icon: "",
  //       label: "Voucher Entry",
  //       to: "/voucher-entry",
  //       badge: "no",
  //     },
  //     {
  //       id: "expenses",
  //       icon: "",
  //       label: "Expenses",
  //       to: "/expenses",
  //       badge: "no",
  //     },
  //     {
  //       id: "tentative-budgeting",
  //       icon: "",
  //       label: "Tentative Budgeting",
  //       to: "/tentative-budgeting",
  //       badge: "no",
  //     },
  //     {
  //       id: "balance-sheet",
  //       icon: "",
  //       label: "Balance Sheet",
  //       to: "/balanceSheet",
  //       badge: "no",
  //     },
  //     {
  //       id: "day-book",
  //       icon: "",
  //       label: "Day Book",
  //       to: "/day-book",
  //       badge: "no",
  //     },
  //     {
  //       id: "general-ledger",
  //       icon: "",
  //       label: "General Ledger",
  //       to: "/general-ledger",
  //       badge: "no",
  //     },
  //     {
  //       id: "ledger-details",
  //       icon: "",
  //       label: "Ledger Details",
  //       to: "/ledger-details",
  //       badge: "no",
  //     },
  //   ],
  // },
  // {
  //   id: "assets",
  //   icon: "fas fa-file",
  //   label: "Assets",
  //   badge: "no",
  //   subs: [
  //     {
  //       id: "assets",
  //       icon: "",
  //       label: "Assets",
  //       to: "/asset",
  //       badge: "no",
  //     },
  //     {
  //       id: "procurement-management",
  //       icon: "",
  //       label: "Procurement Management",
  //       to: "/procurement-management",
  //       badge: "no",
  //     },
  //     {
  //       id: "vendor-information",
  //       icon: "",
  //       label: "Vendor Information",
  //       to: "/vendor",
  //       badge: "no",
  //     },
  //     {
  //       id: "vendor-category",
  //       icon: "",
  //       label: "Vendor Category",
  //       to: "/vendor-category",
  //       badge: "no",
  //     },
  //   ],
  // },
  // {
  //   id: "stationary-management",
  //   icon: "fas fa-file",
  //   label: "Stationary Management",
  //   badge: "no",
  //   subs: [
  //     {
  //       id: "stationary-management",
  //       icon: "",
  //       label: "Stationary Management",
  //       to: "/stationary-management",
  //       badge: "no",
  //     },
  //     {
  //       id: "stock-entry",
  //       icon: "",
  //       label: "Stock Entry",
  //       to: "/stock-entry",
  //       badge: "no",
  //     },
  //     {
  //       id: "stationUsageEntry",
  //       icon: "",
  //       label: "Stationery Usage Entry",
  //       to: "/stationUsageEntry",
  //       badge: "no",
  //     },
  //     {
  //       id: "quotations-page",
  //       icon: "",
  //       label: "Quotations",
  //       to: "/quotations-page",
  //       badge: "no",
  //     },
  //     {
  //       id: "purchaseOrderEntry",
  //       icon: "",
  //       label: "Purchase Order Entry",
  //       to: "/purchaseOrderEntry",
  //       badge: "no",
  //     },
  //   ],
  // },
  // {
  //   id: "Employees",
  //   icon: "fas fa-file",
  //   label: "Employees",
  //   badge: "no",
  //   subs: [
  //     {
  //       id: "Employees",
  //       icon: "",
  //       label: "Employees",
  //       to: "/employees",
  //       badge: "no",
  //     },
  //     {
  //       id: "EmployeeLeave",
  //       icon: "",
  //       label: "Employee Leave",
  //       to: "/employee-leave",
  //       badge: "no",
  //     },
  //     {
  //       id: "approval-leave",
  //       icon: "",
  //       label: "Approval for Leave",
  //       to: "/approval-leave",
  //       badge: "no",
  //     },
  //     {
  //       id: "pay-slip",
  //       icon: "",
  //       label: "Pay Slip",
  //       to: "/pay-slip",
  //       badge: "no",
  //     },
  //     {
  //       id: "closure",
  //       icon: "",
  //       label: "Closure",
  //       to: "/closure",
  //       badge: "no",
  //     },
  //   ],
  // },
  // {
  //   id: "Library",
  //   icon: "fas fa-file",
  //   label: "Library",
  //   badge: "no",
  //   subs: [
  //     {
  //       id: "library-manage",
  //       icon: "",
  //       label: "Book Stock",
  //       to: "/library-manage",
  //       badge: "no",
  //     },
  //     {
  //       id: "Assign",
  //       icon: "",
  //       label: "Assign",
  //       to: "/distribution-workflow-assign",
  //       badge: "no",
  //     },
  //     {
  //       id: "Return",
  //       icon: "",
  //       label: "Return",
  //       to: "/distribution-workflow-return",
  //       badge: "no",
  //     },
  //   ],
  // },

  // {
  //   id: "Feedback and Rating",
  //   icon: "",
  //   label: "Feedback and Rating",
  //   to: "/Feedback",
  //   badge: "no",
  // },
]
