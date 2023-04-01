import React from "react"
import { Redirect } from "react-router-dom"

// User profile
import UserProfile from "../pages/Authentication/UserProfile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Login2 from "../pages/AuthenticationInner/Login2"
import Register1 from "../pages/AuthenticationInner/Register"
import Register2 from "../pages/AuthenticationInner/Register2"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import Recoverpw2 from "../pages/AuthenticationInner/Recoverpw2"
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"
import LockScreen2 from "../pages/AuthenticationInner/auth-lock-screen-2"
import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail"
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2"
import EmailVerification from "../pages/AuthenticationInner/auth-email-verification"
import EmailVerification2 from "../pages/AuthenticationInner/auth-email-verification-2"
import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification"
import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2"
import PaymentMode from "../pages/PaymentMode/list"
import Role from "../pages/Role/list"
import AssetCategory from "../pages/AssetCategory/list"
import CMS from "../pages/CMS/list"
import About from "../pages/About/list"
import Faq from "../pages/Faq/list"
import Contact from "../pages/Contact/list"
import SocietySetting from "../pages/SocietySetting/list"
import ProfileUpdate from "../pages/ProfileUpdate/list"
import JewelLoanSettings from "../pages/JewelLoanSettings/list"
import EmployeeDepartment from "../pages/EmployeeDepartment/list"
import SocietyRegistration from "pages/SocietyRegistration/list"
import GLAccounts from "../pages/GLAccounts/list"
import AccountsGroup from "../pages/GLAccountsGroup/list"
import suretyUpdate from "../pages/SuretyUpdate/list"
import depositDisbursement from "../pages/DepositDisbursement/list"
import loanDisbursement from "../pages/LoanDisbursement/list"
import expenses from "../pages/Expenses/list"
import quotationsPage from "../pages/QuotationsPage/list"
import ManageQuotations from "../pages/QuotationsPage/Manage"
import designation from "../pages/Designation/list"
import Branch from "../pages/BranchAdd/list"
import Area from "../pages/Area/list"
import Level from "../pages/Level/list"
import expenseReport from "../pages/ExpenseCategory/list"
import manageLibrary from "../pages/Library/list"
import salaryStructure from "../pages/SalaryStructure/list"
import religionCRUD from "../pages/ReligionCRUD/list"
import ManageArea from "../pages/Area/manageArea"
import MemberSettlement from "../pages/MemberSettlement/list"
import MemberLedger from "../pages/MemberLedger/list"
import AmountWithdraw from "../pages/AmountWithdraw/list"
import AmountDeposit from "../pages/AmountDeposit/list"
import MemberManagement from "../pages/MemberManagement/list"
import MemberJournal from "../pages/MemberJournal/list"
import DepositList from "../pages/Deposits/list"
import LoanonDeposit from "../pages/LoanonDeposit/list"
import TentativeBudgeting from "../pages/TentativeBudgeting/list"
import ManageTentativeBudgeting from "pages/TentativeBudgeting/manage"
import DemandRecovery from "../pages/DemandRecovery/list"
import Asset from "../pages/Asset/list"
import ManageAsset from "pages/Asset/manage"
import StationaryManagement from "../pages/StationaryManagement/list"
import ManageStationaryManagement from "pages/StationaryManagement/manage"
import VoucherEntry from "../pages/VoucherEntry/list"
import DistributionWorkflowAssign from "../pages/DistributionWorkflow/Assign"
import DistributionWorkflowReturn from "../pages/DistributionWorkflow/Return"
import DemandGeneration from "../pages/DemandGeneration/list"
import DayBook from "../pages/DayBook/list"
import Vendor from "../pages/Vendor/list"
import VendorCategory from "../pages/VendorCategory/list"
import Access from "../pages/AccessRight/crud"
import Loan from "../pages/Loan/list"
import FestivalLoan from "../pages/FestivalLoan/list"
import ProcurementManagement from "../pages/ProcurementManagement/list"
import InvoicePayment from "../pages/InvoicePayment/list"
import Employees from "../pages/Employees/list"
import AddEmployees from "../pages/Employees/AddEmployees"
import EmployeeLeave from "../pages/EmployeeLeave/list"
import StockEntry from "../pages/StockEntry/list"
import ApprovalLeave from "../pages/ApprovalForLeave/list"
import PurchaseOrderEntry from "../pages/PurchaseOrderEntry/list"
import StationUsageEntry from "../pages/StationUsageEntry/list"
import Division from "../pages/Division/list"
import SubDivision from "../pages/SubDivision/list"
import GeneralLedger from "../pages/GeneralLedger/list"
import LedgerDetails from "../pages/LedgerDetails/list"
import TransactionEntry from "../pages/TransactionEntry/list"
import Feedback from "../pages/Feedback/list"
import Closure from "../pages/Closure/list"
import AddProductDeposit from "../pages/AddProductDeposit/list"
import AddProduct from "../pages/AddProductLoanType/list"
import BalanceSheet from "../pages/BalanceSheet/list"
import LoanApplication from "../pages/LoanApplication/list"
import Deposits from "../pages/MemberDeposits/list"
import DepositsList from "../pages/DepositsList/list"
import PaySlip from "../pages/PaySlip/list"
import ManageBook from "../pages/Library/manage"
import MemberRegistration from "../pages/MemberRegistration/list"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Pages
import PagesStarter from "../pages/Utility/pages-starter"
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import PagesFaqs from "../pages/Utility/pages-faqs"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"
import AreaManage from "pages/Area/manage"
import ChangePassword from "pages/Authentication/ChangePassword"
import DetailedMemberView from "pages/DemandGeneration/DetailedMemberView"
import Stationary from "pages/Stationary/list"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  //profile
  { path: "/profile", component: UserProfile },

  //Utility
  { path: "/pages-starter", component: PagesStarter },
  { path: "/pages-faqs", component: PagesFaqs },
  { path: "/cms", component: CMS },
  { path: "/gl-accounts", component: GLAccounts },
  { path: "/accounts-group", component: AccountsGroup },
  { path: "/expense-category", component: expenseReport },
  { path: "/level", component: Level },
  { path: "/society-setting", component: SocietySetting },
  { path: "/profile-update", component: ProfileUpdate },
  { path: "/jewel-loan-setting", component: JewelLoanSettings },
  { path: "/role", component: Role },
  { path: "/employee-department", component: EmployeeDepartment },
  { path: "/society-registration", component: SocietyRegistration },
  { path: "/member-management", component: MemberManagement },
  { path: "/payment-mode", component: PaymentMode },
  { path: "/asset-category", component: AssetCategory },
  { path: "/library-manage", component: manageLibrary },
  { path: "/salary-structure", component: salaryStructure },
  { path: "/surety-update", component: suretyUpdate },
  { path: "/deposit-disbursement", component: depositDisbursement },
  { path: "/loan-disbursement", component: loanDisbursement },
  { path: "/expenses", component: expenses },
  { path: "/quotations-page", component: quotationsPage },
  { path: "/manage-quotations/:id?", component: ManageQuotations },
  { path: "/designation-page", component: designation },
  { path: "/branch", component: Branch },
  { path: "/religion-crud", component: religionCRUD },
  { path: "/member-registration", component: MemberRegistration },
  { path: "/area", component: Area },
  { path: "/areamanage/:parentarea?/:areaid?", component: AreaManage },
  { path: "/managearea", component: ManageArea },
  { path: "/logout", component: Logout },
  { path: "/change-password", component: ChangePassword },
  { path: "/member-management", component: MemberManagement },
  { path: "/member-settlement", component: MemberSettlement },
  { path: "/member-ledger", component: MemberLedger },
  { path: "/amount-withdraw", component: AmountWithdraw },
  { path: "/amount-deposit", component: AmountDeposit },
  { path: "/member-journal", component: MemberJournal },
  { path: "/deposit-list", component: DepositList },
  { path: "/loan-on-deposit", component: LoanonDeposit },
  { path: "/stationary", component: Stationary },
  { path: "/tentative-budgeting", component: TentativeBudgeting },
  {
    path: "/manage-tentative-budgeting/:id?",
    component: ManageTentativeBudgeting,
  },
  { path: "/demand-recovery", component: DemandRecovery },
  { path: "/asset", component: Asset },
  { path: "/manage-asset/:id?", component: ManageAsset },
  { path: "/stationary-management", component: StationaryManagement },
  {
    path: "/manage-stationary-management/:id?",
    component: ManageStationaryManagement,
  },
  { path: "/voucher-entry", component: VoucherEntry },
  {
    path: "/distribution-workflow-assign",
    component: DistributionWorkflowAssign,
  },
  {
    path: "/distribution-workflow-return",
    component: DistributionWorkflowReturn,
  },
  { path: "/demand-generation", component: DemandGeneration },
  { path: "/detailed-member-view", component: DetailedMemberView },
  { path: "/day-book", component: DayBook },
  { path: "/vendor", component: Vendor },
  { path: "/vendor-category", component: VendorCategory },
  { path: "/festival-loan", component: FestivalLoan },
  { path: "/procurement-management", component: ProcurementManagement },
  { path: "/access", component: Access },
  { path: "/invoice-payment", component: InvoicePayment },
  { path: "/employees", component: Employees },
  { path: "/add-employees", component: AddEmployees },
  { path: "/employee-leave", component: EmployeeLeave },
  { path: "/stock-entry", component: StockEntry },
  { path: "/division", component: Division },
  { path: "/sub-division", component: SubDivision },
  { path: "/loan", component: Loan },
  { path: "/approval-leave", component: ApprovalLeave },
  { path: "/purchaseOrderEntry", component: PurchaseOrderEntry },
  { path: "/stationUsageEntry", component: StationUsageEntry },
  { path: "/general-ledger", component: GeneralLedger },
  { path: "/ledger-details", component: LedgerDetails },
  { path: "/transaction-entry", component: TransactionEntry },
  { path: "/Feedback", component: Feedback },
  { path: "/closure", component: Closure },
  { path: "/addProductDeposit", component: AddProductDeposit },
  { path: "/addProduct", component: AddProduct },

  { path: "/balanceSheet", component: BalanceSheet },
  { path: "/loan-application", component: LoanApplication },
  { path: "/deposits", component: Deposits },
  { path: "/depositsList", component: DepositsList },
  { path: "/pay-slip", component: PaySlip },
  { path: "/manage-book/:id?", component: ManageBook },
  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  // { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/pages-about", component: About },
  { path: "/pages-contact", component: Contact },
  { path: "/pages-faq", component: Faq },
  { path: "/pages-paymentmode", component: PaymentMode },
  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-login-2", component: Login2 },
  { path: "/pages-register", component: Register1 },
  { path: "/pages-register-2/forgot-password", component: Register2 },
  { path: "/page-recoverpw", component: Recoverpw },
  { path: "/page-recoverpw-2", component: Recoverpw2 },
  { path: "/pages-forgot-pwd", component: ForgetPwd1 },
  { path: "/auth-lock-screen", component: LockScreen },
  { path: "/auth-lock-screen-2", component: LockScreen2 },
  { path: "/page-confirm-mail", component: ConfirmMail },
  { path: "/page-confirm-mail-2", component: ConfirmMail2 },
  { path: "/auth-email-verification", component: EmailVerification },
  { path: "/auth-email-verification-2", component: EmailVerification2 },
  { path: "/auth-two-step-verification", component: TwostepVerification },
  { path: "/auth-two-step-verification-2", component: TwostepVerification2 },
  { path: "/about", component: About },
  { path: "/faq", component: Faq },
  { path: "/contact", component: Contact },
]

export { authProtectedRoutes, publicRoutes }
