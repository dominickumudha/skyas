import * as Yup from "yup"
import { yupToFormErrors } from "formik"
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "div"]
const INVOICECOPY_SUPPORTEDFORMAT = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "div",
  "application/pdf",
]
const DOCUMENT_SUPPORTED_FORMATS = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/doc",
  "application/docx",
  "div",
]
const EXCEL_SUPPORTED_FORMATS = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/msexcel",
]
export const shareSettingvalidationSchema = Yup.object().shape({
  EffectiveFrom: Yup.date().required(
    "Please Select valid Effective From Date!"
  ),
  EffectiveTo: Yup.date()
    .when("EffectiveFrom", (EffectiveFrom, schema) => {
      return (
        EffectiveFrom &&
        schema.min(
          EffectiveFrom,
          "Effective To should be greater or equal to Effective From"
        )
      )
    })
    .nullable()
    .required("Please Select valid Effective To Date!"),
  ValueOfOneShare: Yup.string().required(
    "Please Enter valid  Value Of One Share"
  ),
  AuthorizedShareCapital: Yup.string().required(
    "Please Enter valid Authorized Share Capital "
  ),
  CapitalGLAccount: Yup.string().required(
    "Please Enter valid Capital GL Account "
  ),
  HasEntranceFee: Yup.string().required(
    "Please Select valid Has Entrance Fee "
  ),
  EntranceFeeForEachShare: Yup.string().required(
    "Please Enter valid Entrance Fee For Each Share "
  ),
  MaximumEntranceFee: Yup.string().required(
    "Please Enter valid Authorized Maximum Entrance Fee "
  ),
  PercentageOfAllowedSharePaidUpCapital: Yup.string().required(
    "Please Enter valid PercentageOfAllowed Share Paid Up Capital "
  ),
})
export const dividendSettingvalidationSchema = Yup.object().shape({
  EffectiveFrom: Yup.date().required(
    "Please Select valid Effective From Date!"
  ),
  EffectiveTo: Yup.date()
    .when("EffectiveFrom", (EffectiveFrom, schema) => {
      return (
        EffectiveFrom &&
        schema.min(
          EffectiveFrom,
          "Effective To should be greater or equal to Effective From"
        )
      )
    })
    .nullable()
    .required("Please Select valid Effective To Date!"),
  DividendPercentage: Yup.number().required(
    "Please Enter valid  Dividend Percentage"
  ),
  ReserveFundsPercentage: Yup.number().required(
    "Please Enter valid Reserve Funds Percentage "
  ),
  CapitalGLAccount: Yup.string().required(
    "Please Select valid Capital GL Account "
  ),
  ResearchDevelopmentFund: Yup.number().required(
    "Please Enter valid Co-op Research & Development Fund "
  ),
  EducationFund: Yup.number().required(
    "Please Enter valid Co-op Education Fund "
  ),
  BadDoubtfulReserveFund: Yup.number().required(
    "Please Enter valid Bad & Doubtful Reserve Fund "
  ),
  CommonGoodFund: Yup.number().required("Please Enter valid Common Good Fund "),
  BuildingFund: Yup.number().required("Please Enter valid Building Fund "),
  Honorarium: Yup.number().required("Please Enter valid Honorarium "),
  Bonus: Yup.number().required("Please Enter valid Bonus "),
})
export const GLAccountsValidation = Yup.object().shape({
  name: Yup.string().required("Please Enter valid Accounts Master Name"),
  parentGL: Yup.string().required("Please Select valid Parent GL"),
  accountHeadName: Yup.string().required(
    "Please Enter valid Accounts Head Name "
  ),
  accountGroup: Yup.string().required("Please Select valid Accounts Group"),
})
export const AccountsGroupValidation = Yup.object().shape({
  name: Yup.string().required("Please Enter valid Accounts Group Name"),
})
export const StationaryValidation = Yup.object().shape({
  name: Yup.string().required("Please Enter valid Accounts Group Name"),
})
export const ManageAreaValidation = Yup.object().shape({
  name: Yup.string().required("Please Enter valid Area Name"),
})
export const AreaValidation = Yup.object().shape({
  name: Yup.string().required("Please Enter valid Area Name"),
  shortCode: Yup.string().required("Please Enter valid Short Code"),
  Level: Yup.string().required("Please Select valid Level"),
})
export const VendorValidation = Yup.object().shape({
  name: Yup.string().required("Please Enter valid Area Name"),
  shortCode: Yup.string().required("Please Enter valid Short Code"),
  Level: Yup.string().required("Please Select valid Level"),
})
export const vendorCategoryValidation = Yup.object().shape({
  name: Yup.string().required("Please Enter valid Area Name"),
  shortCode: Yup.string().required("Please Enter valid Short Code"),
  Level: Yup.string().required("Please Select valid Level"),
})
export const LevelValidation = Yup.object().shape({
  Level: Yup.string().required("Please Enter valid Level Name"),
})
export const paymentModeValidation = Yup.object().shape({
  paymentMode: Yup.string()
    .required("Please Enter Payment Mode!")
    .max(150, "Please Must Contain 150 Character Only"),
  isActive: Yup.string().required("Please  Active Now!"),
})
export const assetCategoryValidation = Yup.object().shape({
  categoryName: Yup.string()
    .required("Please Enter Category Name!")
    .max(200, "Please Must Contain 200 Character Only"),
  isActive: Yup.string().required("Please  Active Now!"),
  description: Yup.string().max(250, "Please Must Contain 250 Character Only"),
})
export const productsValidation = Yup.object().shape({})

export const membersettingvalidationSchema = Yup.object().shape({
  effectiveFrom: Yup.date().required(
    "Please Select valid Effective From Date!"
  ),
  effectiveTo: Yup.date()
    .when("effectiveFrom", (effectiveFrom, schema) => {
      return (
        effectiveFrom &&
        schema.min(
          effectiveFrom,
          "Effective To should be greater or equal to Effective From"
        )
      )
    })
    .nullable()
    .required("Please Select valid Effective To Date!"),
  minimumServicePeriodForAdmission: Yup.string()
    .required("Please Enter valid  Minimum Service Period For Admission")
    .matches(/^\d+$/, "Please must contain number only."),
  readmissionCanBeAllowedAfterPeriod: Yup.string()
    .required("Please Enter valid Readmission Can Be Allowed After Period ")
    .matches(/^\d+$/, "Please must contain number only."),
  penaltyFeesForReadmission: Yup.string()
    .required("Please Enter valid Penalty Fees For Readmission")
    .matches(/^\d+$/, "Please must contain number only."),
  minimumSharesToBuy: Yup.string()
    .required("Please Select valid Minimum Shares To Buy ")
    .matches(/^\d+$/, "Please must contain number only."),
  maximumSharesCanBuy: Yup.string()
    .required("Please Enter valid  Maximum Shares Can Buy")
    .matches(/^\d+$/, "Please must contain number only."),
  maximumBorrowingPower: Yup.string()
    .required("Please Enter valid Maximum Borrowing Power")
    .matches(/^\d+$/, "Please must contain number only."),
  allowReadmissiononPaymentof: Yup.array().required(
    "Please Enter valid Allow Readmission On Payment Of "
  ),
})

export const boardofDirectorsValidation = Yup.object().shape({
  name: Yup.string()
    .required("Please Enter Name!")
    .max(200, "Please Enter 200 Character Only"),
  designation: Yup.string()
    .required("Please Enter Designation!")
    .max(150, "Please Enter 200 Character Only"),
  image: Yup.mixed()
    .required("Please Upload photo!")
    .test(
      "fileSize",
      "File Size is too large",
      value => value && value.size <= 5242880
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    ),

  signature: Yup.mixed()
    .required("Please Upload Signature!")
    .test(
      "fileSize",
      "File Size is too large",
      value => value && value.size <= 5242880
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  effectiveFrom: Yup.date().required("Please Select Effective From Date!"),
  effectiveTo: Yup.date()
    .when("effectiveFrom", (effectiveFrom, schema) => {
      return (
        effectiveFrom &&
        schema.min(
          effectiveFrom,
          "Effective To should be greater or equal to Effective From"
        )
      )
    })
    .nullable()
    .required("Please Select valid Effective To Date!"),
})

export const workFlowValidation = Yup.object().shape({
  transactionFlow: Yup.string().required("Please Select Transaction Flow!"),
  checker: Yup.array().required("Please Select Checker!"),
  marker: Yup.string().required("Please Select Marker!"),
  effectiveFrom: Yup.string().required("Please Select Effective From Date!"),
  effectiveTo: Yup.date()
    .when("effectiveFrom", (effectiveFrom, schema) => {
      return (
        effectiveFrom &&
        schema.min(
          effectiveFrom,
          "Effective To should be greater or equal to Effective From"
        )
      )
    })
    .nullable()
    .required("Please Select valid Effective To Date!"),
})

export const jewelLoanValidation = Yup.object().shape({
  marketRate: Yup.string()
    .required("Please Enter Market Rate!")
    .matches(/^\d+$/, "Please must contain number only."),
  netWeight: Yup.string()
    .required("Please Enter Net Weight!")
    .matches(/^\d+$/, "Please must contain number only."),

  effectiveFrom: Yup.string().required("Please Select Effective From Date!"),

  effectiveTo: Yup.date()
    .when("effectiveFrom", (effectiveFrom, schema) => {
      return (
        effectiveFrom &&
        schema.min(
          effectiveFrom,
          "Effective To should be greater or equal to Effective From"
        )
      )
    })
    .nullable()
    .required("Please Select valid Effective To Date!"),
})

export const roleValidation = Yup.object().shape({
  role: Yup.string()
    .required("Please Enter Role!")
    .max(200, "Please Enter 200 Character Only"),
  isActive: Yup.string().required("Please  Active Now!"),
})

export const employeeDepartmentValidation = Yup.object().shape({
  departmentName: Yup.string()
    .required("Please Enter Department Name!")
    .max(200, "Please Enter 200 Character Only"),
  description: Yup.string().max(200, "Please Enter 200 Character Only"),
  isActive: Yup.string().required("Please  Active Now!"),
})
export const profileUpdateValidation = Yup.object().shape({
  name: Yup.string()
    .required("Please Enter Name")
    .max(200, "Please Enter 200 Character Only"),
  contactNumber: Yup.string()
    .required("Please Enter valid Contact Number")
    .matches(/^\d+$/, "Please Must Contain Number only.")
    .min(10, "Please Enter 10 Number Only")
    .max(10, "Please Enter 10 Number Only"),
  emailId: Yup.string().required("Please Enter valid Email Id"),
  address: Yup.string()
    .required("Please Enter valid Address")
    .max(200, "Please Enter 200 Character Only"),
})
export const ExpenseCategoryValidation = Yup.object().shape({
  Name: Yup.string().required("Please Enter Name"),
  TDSappl: Yup.string().required("Please choose any one option"),
  TDSVal: Yup.string().required("Please Enter valid Email Id"),
})
export const religionCrudValidation = Yup.object().shape({
  name: Yup.string().required("Please Enter Name"),
  religion: Yup.string().required("Please Enter Religion"),
  userID: Yup.string().required("Please Enter User ID "),
})
export const loginValidation = Yup.object().shape({
  userName: Yup.string().required("Please Enter Username"),
  password: Yup.string()
    .required("Please Enter Password")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .min(6, "Please  Enter  6 Digit Number")
    .max(6, "Please Enter 6 Digit Number"),
})
export const forgotValidation = Yup.object().shape({
  email: Yup.string().required("Please Enter valid Email Id"),
})
export const BranchValidation = Yup.object().shape({
  Name: Yup.string().required("Please Enter valid Name"),
})

export const generalValidation = Yup.object().shape({
  name: Yup.string()
    .required("Please Enter Name")
    .matches(
      /^[0-9a-zA-Z\s\r\n@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\?]+$/,
      "Please Must Contain Only Number, Letter and Special Character"
    )
    .max(200, "Please Enter 200 Character"),

  code: Yup.string()
    .required("Please Enter Code")
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Only Number and Letter")
    .max(20, "Please Enter 20  Character Only"),
  logo: Yup.mixed()
    .required("Please Upload Logo!")
    .test(
      "fileSize",
      "File Size is too large",
      value => value && value.size <= 5242880
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  doorNo: Yup.string()
    .required("Please Enter Door No")
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Only Number and Letter")
    .max(20, "Please Enter 20 Character Only"),
  addressLine1: Yup.string()
    .required("Please Enter Address Line !")
    .matches(
      /^[0-9a-zA-Z\s\r\n@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\?]+$/,
      "Please Must Contain  Number , Letter and Special Characters"
    )
    .max(100, "Please Enter 100 Character Only"),
  addressLine2: Yup.string()
    .matches(
      /^[0-9a-zA-Z\s\r\n@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\?]+$/,
      "Please Must Contain  Number , Letter and Special Characters"
    )
    .max(100, "Please Enter 100 Character Only"),
  pinCode: Yup.string()
    .required("Please Enter Pin Code")
    .matches(/^\d+$/, "Please  Must Contain Number Only.")
    .min(6, "Please  Enter  6 Digit Number")
    .max(6, "Please Enter 6 Digit Number"),
  taluk: Yup.string().required("Please Select Your Taluk"),
  union: Yup.string()
    .required("Please Enter Union")
    .max(20, "Please Enter 20 Character Only"),

  contactNo: Yup.string()
    .required("Please Enter valid Contact Number")
    .matches(/^\d+$/, "Please Must Contain Number only.")
    .min(10, "Please Enter 10 Number Only")
    .max(10, "Please Enter 10 Number Only"),
  tanNo: Yup.string()
    .required("Please Enter TAN No")
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Only Number and Letter")
    .min(10, "Please Enter 10 Character")
    .max(10, "Please Enter 10 Character Only"),
  panNo: Yup.string()
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Only Number and Letter")
    .min(10, "Please Enter 10 Character")
    .max(10, "Please Enter 10 Character Only"),
  gstinNo: Yup.string()
    .required("Please Enter GSTIN No")
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Only Number and Letter")
    .min(15, "Please Enter 15 Character")
    .max(15, "Please Enter 15 Character Only"),
  district: Yup.string().required("Please Select District"),
})

export const ChangePassordValidation = Yup.object().shape({
  OTP: Yup.string()
    .required("Please Enter OTP")
    .matches(/^\d+$/, "OTP must contain number only.")
    .min(6, "Please  Enter  6 Digit Number")
    .max(6, "Please Enter 6 Digit Number"),
  Password: Yup.string()
    .required("Please Enter Password")
    .matches(/^\d+$/, "OTP must contain number only.")
    .min(6, "Please  Enter  6 Digit Number")
    .max(6, "Please Enter 6 Digit Number"),
  ChangePassword: Yup.string()
    .required("Please Enter Confirm Password")
    .matches(/^\d+$/, "OTP must contain number only.")
    .min(6, "Please  Enter  6 Digit Number")
    .max(6, "Please Enter 6 Digit Number")
    .when("Password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("Password")],
        "Both password need to be the same"
      ),
    }),
})
export const RecoverySettingsvalidationSchema = Yup.object().shape({
  PostalMiscellaneousCharge: Yup.number().required(
    "Please Enter valid  Postal & Miscellaneous Charge"
  ),
  PenalCharges: Yup.number().required("Please Enter valid Penal Charges "),
  LoanInterest: Yup.string().required("Please Select valid Loan Interest "),
  DepositSavings: Yup.number().required("Please Enter valid Deposit-Savings "),
  FamilyWelfareFund: Yup.number().required(
    "Please Enter valid Family Welfare Fund "
  ),
  LoanPrincipal: Yup.number().required("Please Enter valid Loan Principal "),
})

export const DocumentValidationSchema = Yup.object().shape({
  proposalDocument: Yup.mixed()
    .required("Please Upload Proposal Documents!")
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && DOCUMENT_SUPPORTED_FORMATS.includes(value.type)
    ),
  certifiedByLaw: Yup.mixed()
    .required("Please Upload Certified-By-Law Certificate!")
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && DOCUMENT_SUPPORTED_FORMATS.includes(value.type)
    ),
  registrationCertificate: Yup.mixed()
    .required("Please Upload Registration Certificate!")
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && DOCUMENT_SUPPORTED_FORMATS.includes(value.type)
    ),
})

export const bankDeetsValidation = Yup.object().shape({
  name: Yup.string().required("Please Enter Name Here!"),
  acNo: Yup.string()
    .required("Please Enter Account Number Here!")
    .min(11, "Please Enter Minimum of 11 Digits")
    .max(16, "Please Enter a 16 Digit Number"),
  micr: Yup.string()
    .required("Please Enter Your MICR Number Here!")
    .max(9, "Please Enter a 9 Digit Number"),
  ifsc: Yup.string()
    .required("Please Enter Your Bank's IFSC Code Here")
    .max(11, "Please Enter Only 11 Digits!"),
  branch: Yup.string().required("Please Enter Your Bank Branch Here"),
})
export const PersonalDetailsValidationSchema = Yup.object().shape({
  Title: Yup.string().required("Please Select valid Title"),
  Name: Yup.string()
    .required("Please Enter valid Name")
    .max(200, "Name must have less than 200 characters"),
  Gender: Yup.string().required("Please Select valid Gender"),
  Married: Yup.string().required("Please Select valid Married Status"),
  Email: Yup.string().max(100, "Email must have less than 200 characters"),
  MobileNo: Yup.string()
    .required("please Enter Valid Mobile Number")
    .matches(/^\d+$/, "Please  Must Contain Number Only.")
    .min(10, "Please Enter 10 Character")
    .max(10, "Please Enter 10 Character Only"),
  LandlineNo: Yup.string()
    .matches(/^\d+$/, "Please  Must Contain Number Only.")
    .min(12, "Landline Number Must Contain 12 Digits")
    .max(12, "Landline Number Must Contain 12 Digits Only"),
  FHName: Yup.string()
    .required("Please Enter valid Father's/Husband Name")
    .max(200, "Father's/Husband Name must have less than 200 characters"),
  Community: Yup.string().max(
    100,
    "Community must have less than 100 characters"
  ),
  Caste: Yup.string().max(100, "Caste must have less than 100 characters"),
  DOB: Yup.date().required("Please Select DOB!"),
  Photo: Yup.mixed()
    .required("Please Upload Photo!")
    .test(
      "fileSize",
      "File Size is too large",
      value => value && value.size <= 5242880
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    ),

  signature: Yup.mixed()
    .required("Please Upload Signature!")

    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      "fileSize",
      "File Size is too large",
      value => value && value.size <= 5242880
    ),
  DoorNo: Yup.string()
    .required("Please Enter valid Door No")
    .max(20, "Door No Must Have Less Than 20 Characters"),
  AddressLine1: Yup.string()
    .required("Please Enter valid Address Line 1")
    .max(100, "Address Line 1 Must Have Less Than 100 Characters"),
  AddressLine2: Yup.string().max(
    100,
    "Address Line 2 Must Have Less Than 100 Characters"
  ),
  Area: Yup.string().required("Please Select valid Area"),
  District: Yup.string().required("Please Select valid District"),
  PinCode: Yup.string()
    .matches(/^\d+$/, "Please  Must Contain Number Only.")

    .min(6, "PinCode Must Contain 6 Digits")
    .max(6, "PinCode Must Contain 6 Digits Only"),
  PANNo: Yup.string()
    .required("Please Enter valid PAN No")
    .max(12, "PAN No Must Have Less Than 12 Characters"),
  AadhaarNo: Yup.string()
    .required("Please Enter valid Aadhaar Number")
    .matches(/^\d+$/, "Please  Must Contain Number Only.")
    .min(12, "Aadhaar Number Must Contain 12 Digits")
    .max(13, "Aadhaar Number Must Contain 12 Digits Only"),
})
export const ShareDetailsvalidationSchema = Yup.object().shape({
  ResolutionNumber: Yup.string()
    .required("Please Enter valid Resolution Number")
    .matches(
      /^[0-9a-zA-Z]+$/,
      "Resolution Number Must Contain Only Number and Letter"
    ),
  EntranceFees: Yup.number().required("Please Enter valid Entrance Fees"),
  NumberofShares: Yup.number().required("Please Enter valid Number of Shares"),
  ResolutionDate: Yup.date().required("Please Select valid Resolution  Date!"),
})
export const employeeDetailValidation = Yup.object().shape({
  employeeCode: Yup.string()
    .required("Please Enter Employee Code")
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Only Number and Letter")
    .max(50, "Please Enter 50 Character Only"),
  designation: Yup.string()
    .required("Please Enter Designation")
    .max(150, "Please Enter 150 Character Only"),
  doj: Yup.date().required("Please Select Date"),
  dro: Yup.date().required("Please Select Date"),
  division: Yup.string().required("Please Select Division"),
  subDivision: Yup.string().required("Please Select Sub Division"),
  basic: Yup.number().required("Please Enter Valid Basic"),

  dA: Yup.number().required("Please Enter Valid D.A"),

  eA: Yup.number().required("Please Enter Valid E.A"),

  otherAllowances: Yup.number().required("Please Enter Valid Other Allowances"),

  deductions: Yup.number().required("Please Enter valid Deductions"),

  totalPay: Yup.number().required("Please Enter Total Pay"),

  netPay: Yup.number().required("Please Enter Valid Net Pay"),

  payDate: Yup.date().required("Please Select Pay Date"),

  dateOfConfirmation: Yup.date().required("Please Select Date of Confirmation"),
})

export const NomineeDetailsValidationSchema = Yup.object().shape({
  NomineeForShares: Yup.string()
    .required("Please Enter valid Nominee Name For Shares")
    .max(200, "Name must have less than 200 characters"),
  NomineeForDeposit: Yup.string()
    .required("Please Enter valid Nominee Name for Deposits")
    .max(200, "Name must have less than 200 characters"),
  NomineeForSharesRelation: Yup.string()
    .required("Please Enter valid Relation")
    .max(100, "Address Line 1 Must Have Less Than 100 Characters"),
  NomineeForSharesAdditionalDetails: Yup.string().max(
    200,
    "Additional Details must have less than 200 characters"
  ),
  NomineeForSharesDoorNo: Yup.string()
    .required("Please Enter valid Door No")
    .max(20, "Door No Must Have Less Than 20 Characters"),
  NomineeForSharesAddressLine1: Yup.string()
    .required("Please Enter valid Address Line 1")
    .max(100, "Address Line 1 Must Have Less Than 100 Characters"),
  NomineeForSharesAddressLine2: Yup.string().max(
    100,
    "Address Line 2 Must Have Less Than 100 Characters"
  ),
  NomineeForSharesArea: Yup.string().required("Please Select valid Area"),
  NomineeForSharesDistrict: Yup.string().required(
    "Please Select valid District"
  ),
  NomineeForSharesPinCode: Yup.string()
    .matches(/^\d+$/, "Please  Must Contain Number Only.")

    .min(6, "PinCode Must Contain 6 Digits")
    .max(6, "PinCode Must Contain 6 Digits Only"),
  NomineeForSharesMemberID: Yup.string().required(
    "Please Select valid Member ID"
  ),
  NomineeForSharesPhoneNumber: Yup.string()
    .required("please Enter Valid Phone Number")
    .matches(/^\d+$/, "Please  Must Contain Number Only.")
    .min(10, "Please Enter 10 Character")
    .max(10, "Please Enter 10 Character Only"),
  NomineeForSharesAadhaarNo: Yup.string()
    .required("Please Enter valid Aadhaar Number")
    .matches(/^\d+$/, "Please  Must Contain Number Only.")
    .min(12, "Aadhaar Number Must Contain 12 Digits")
    .max(13, "Aadhaar Number Must Contain 12 Digits Only"),
  NomineeForDepositRelation: Yup.string()
    .required("Please Enter valid Relation")
    .max(100, "Address Line 1 Must Have Less Than 100 Characters"),
  NomineeForDepositAdditionalDetails: Yup.string().max(
    200,
    "Additional Details must have less than 200 characters"
  ),
  NomineeForDepositDoorNo: Yup.string()
    .required("Please Enter valid Door No")
    .max(20, "Door No Must Have Less Than 20 Characters"),
  NomineeForDepositAddressLine1: Yup.string()
    .required("Please Enter valid Address Line 1")
    .max(100, "Address Line 1 Must Have Less Than 100 Characters"),
  NomineeForDepositAddressLine2: Yup.string().max(
    100,
    "Address Line 2 Must Have Less Than 100 Characters"
  ),
  NomineeForDepositArea: Yup.string().required("Please Select valid Area"),
  NomineeForDepositDistrict: Yup.string().required(
    "Please Select valid District"
  ),
  NomineeForDepositPinCode: Yup.string()
    .matches(/^\d+$/, "Please  Must Contain Number Only.")

    .min(6, "PinCode Must Contain 6 Digits")
    .max(6, "PinCode Must Contain 6 Digits Only"),
  NomineeForDepositMemberID: Yup.string().required(
    "Please Select valid Member ID"
  ),
  NomineeForDepositPhoneNumber: Yup.string()
    .required("please Enter Valid Phone Number")
    .matches(/^\d+$/, "Please  Must Contain Number Only.")
    .min(10, "Please Enter 10 Character")
    .max(10, "Please Enter 10 Character Only"),
  NomineeForDepositAadhaarNo: Yup.string()
    .required("Please Enter valid Aadhaar Number")
    .matches(/^\d+$/, "Please  Must Contain Number Only.")
    .min(12, "Aadhaar Number Must Contain 12 Digits")
    .max(13, "Aadhaar Number Must Contain 12 Digits Only"),
})
export const memberSettlementValidation = Yup.object().shape({
  applyDate: Yup.date().required("Please Select Date"),
  closureType: Yup.string().required("Please Select  Closure Type"),
  member: Yup.string().required("Please Type and Search Member"),
  referenceLetter: Yup.mixed()
    .required("Please Upload Reference Letter!")
    .test(
      "fileSize",
      "File Size is too large",
      value => value && value.size <= 5242880
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && DOCUMENT_SUPPORTED_FORMATS.includes(value.type)
    ),
  expiredDate: Yup.date().required("Please Select Expired Date"),
  suretyMember: Yup.string()
    .required("Please Enter Surety Member")
    .max(50, "Please Enter 50 Character Only"),
  resolutionNo: Yup.string()
    .required("Please Enter Resolution Number")
    .max(50, "Please Enter %0 character Only")
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Only Number and Letter"),
  resolutionDate: Yup.date().required("Please Select Resolution Date"),
})

export const memberLedgerValidation = Yup.object().shape({
  memberId: Yup.string()
    .required("Please Type and Search Memeber ID")
    .max(50, " Please Enter 50 Character Only")
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Only Number and Letter"),
  employeeNo: Yup.string()
    .required("Please Type and Search Memeber ID")
    .max(50, " Please Enter 50 Character Only")
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Only Number and Letter"),
  member: Yup.string().required("Please Type and Search Member"),
  division: Yup.string().required("Please Select Division"),
})

export const amountWithdrawValidation = Yup.object().shape({
  accountNo: Yup.string()
    .min(11, "Please Enter Atleast 11 Character Only")
    .max(16, " Please Enter 16 Character Only")
    .matches(/^\d+$/, "Please Must Contain Only Number"),
  date: Yup.date().required("Please Select Date"),
  amount: Yup.string()
    .required("Please Enter Amount")
    .matches(/^\d+$/, "Please Must Contain Only Number"),
  paymentMode: Yup.string().required("Please Select Payment Mode"),
})
export const DepositListValidationSchema = Yup.object().shape({
  MemberID: Yup.string().matches(
    /^[0-9a-zA-Z]+$/,
    "Member ID Must Contain Only Numbers and Letters"
  ),
})
export const MemberJournalValidationSchema = Yup.object().shape({
  Title: Yup.string().required("Please Select valid Title"),
  Date1: Yup.date().required("Please Select valid Date!"),
  MemberID: Yup.string()
    .matches(
      /^[0-9a-zA-Z]+$/,
      "Member ID Must Contain Only Numbers and Letters"
    )
    .required("Please Enter valid Member ID"),
  PaymentMode: Yup.string().required("Please Select valid Payment Mode"),
  Amount: Yup.number().required("Please Enter valid Amount"),
  Date2: Yup.date().required("Please Select valid Date!"),
  ReferenceNumber: Yup.string()
    .matches(
      /^[0-9a-zA-Z]+$/,
      "Member ID Must Contain Only Numbers and Letters"
    )
    .max(30, "Please Enter 30 Character Only")
    .required("Please Enter valid Reference Number"),
  Remarks: Yup.string().max(200, "Please Enter 200 Character Only"),
  IfCashPayment: Yup.array().when("PaymentMode", (PaymentMode, schema) => {
    return PaymentMode && PaymentMode === "Cash"
      ? schema.required("Please Fill the Demomination")
      : schema.notRequired()
  }),
})
export const LoanonDepositValidationSchema = Yup.object().shape({
  AccountNumber: Yup.string()
    .matches(/^[0-9]+$/, "Account Number Must Contain Only Numbers ")
    .min(11, "Please Must Contain 11 Digits")
    .max(16, "Please Must Contain 16 Digits Only"),
  MemberID: Yup.string().matches(
    /^[0-9a-zA-Z]+$/,
    "Member ID Must Contain Only Numbers and Letters"
  ),
  AppliedDate: Yup.date().required("Please Select valid Applied Date!"),
  RequestedAmount: Yup.string()
    .matches(/^[0-9]+$/, "Requested Amount Must Contain Only Numbers ")
    .required("Please Enter valid Requested Amount!"),
  LoanInterestRate: Yup.string()
    .matches(/^[0-9]+$/, "Interest Rate Must Contain Only Numbers ")
    .required("Please Enter valid Interest Rate!"),
  SanctionAmount: Yup.string()
    .matches(/^[0-9]+$/, "Sanction Amount Must Contain Only Numbers ")
    .required("Please Enter valid Sanction Amount!"),
  Reason: Yup.string().required("Please Enter valid Reason!"),
  Tenure: Yup.string().required("Please Enter valid Tenure!"),
  PaymentMode: Yup.string().required("Please Select valid Payment Mode!"),
  Date: Yup.date().required("Please Select valid Date!"),
})
export const tentativeBudgetingValidation = Yup.object().shape({
  Name: Yup.string()
    .required("Please Enter valid  Name!")
    .max(200, "Name must have less than 200 characters"),
  FiscalYear: Yup.date().required("Please Select valid Fiscal Year!"),
  BudgetPeriod: Yup.string()
    .matches(/^[0-9]+$/, "Budget Period Must Contain Only Numbers ")
    .required("Please Enter valid Budget Period!"),
  IncomeAccounts: Yup.array().of(
    Yup.object().shape({
      IncomeAccounts: Yup.mixed()
        .required("Please Select valid Income Accounts!")
        .test(
          "fileFormat",
          "Unsupported Format",
          value => value && SUPPORTED_FORMATS.includes(value.type)
        ),
    })
  ),
  ExpenseAccounts: Yup.array().of(
    Yup.object().shape({
      ExpenseAccounts: Yup.mixed()
        .required("Please Select valid Expense Accounts!")

        .test(
          "fileFormat",
          "Unsupported Format",
          value => value && SUPPORTED_FORMATS.includes(value.type)
        )
        .test(
          "fileSize",
          "File Size is too large",
          value => value && value.size <= 5242880
        ),
    })
  ),
})

export const festivalLoanValidation = Yup.object().shape({
  date: Yup.date().required("Please Select Date"),
  festivalName: Yup.string()
    .required("Please Enter Festival Name")
    .max(150, "Please Enter 150 Character Only"),
  amount: Yup.string()
    .required("Please Enter Amount")
    .matches(/^\d+$/, "Please Must Contain Number Only"),

  tenure: Yup.string().required("Please Enter Tenure"),

  member: Yup.string().max(200, "Please Enter 200 Character Only"),
  roi: Yup.string().required("Please Enter ROI"),
  sanctionedAmount: Yup.string()
    .required("Please Enter Sanctioned Amount")
    .matches(/^\d+$/, "Please Must Contain Number Only"),
  interest: Yup.string()
    .required("Please Enter Interest")
    .matches(/^\d+$/, "Please Must Contain Number Only"),
  installmentAmount: Yup.string()
    .required("Please Enter Installment Amount")
    .matches(/^\d+$/, "Please Must Contain Number Only"),
  month: Yup.string().required("Please Enter Month"),
  paymentMode: Yup.string().required("Please Select Payment Mode"),
  paymentDate: Yup.date().required("Please Select Payment Date"),
  bank: Yup.string().required("Please Enter Bank"),
})

export const procurementManagementValidation = Yup.object().shape({
  assetName: Yup.string()
    .required("Please Enter Asset Name")
    .max(200, "Please Enter 200 Character Only"),
  category: Yup.string()
    .required("Please Enter Category")
    .max(150, "Please Enter 150 Character Only"),

  assetSerialNo: Yup.string()
    .required("Please Enter Asset Serial No")
    .max(150, "Please Enter 150 Character Only")
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Letter and Number Only"),

  assetCost: Yup.string()
    .required("Please Enter Asset Cost")
    .matches(/^\d+$/, "Please Must Contain Number Only"),
  datePurchased: Yup.string().required("Please Select Date"),
  qty: Yup.string()
    .required("Please Enter Quality")
    .matches(/^\d+$/, "Please Must Contain Number Only"),

  vendor: Yup.string()
    .required("Please Enter Vendor")
    .max(150, "Please Enter 150 Character Only"),
  price: Yup.string()
    .required("Please Enter Price")
    .matches(/^\d+$/, "Please Must Contain Number Only"),
  image: Yup.mixed().when({
    is: value => {
      return value ? false : true
    },

    otherwise: Yup.mixed()
      .test(
        "fileSize",
        "File Size is too large",
        value => value && value.size <= 5242880
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  }),
})

export const invoicePaymentValidation = Yup.object().shape({
  vendor: Yup.string().required("Please Select Vendor"),

  date: Yup.date().required("Please Select Date"),

  poNo: Yup.string()
    .required("Please Enter PO No")
    .max(150, "Please Enter 150 Character Only")
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Letter and Number Only"),

  phoneNo: Yup.string()
    .required("Please Enter valid Phone Number")
    .matches(/^\d+$/, "Please Must Contain Number only.")
    .min(10, "Please Enter 10 Number Only")
    .max(10, "Please Enter 10 Number Only"),

  amountToBePaid: Yup.string()
    .required("Please Enter Amount To Be Paid")
    .matches(/^\d+$/, "Please Must Contain Number Only"),

  payingAmount: Yup.string()
    .required("Please Enter Paying Amount")
    .matches(/^\d+$/, "Please Must Contain Number Only"),
  tdsApplicable: Yup.string().required("Please Enter TDS Application"),
  paymentBy: Yup.string().required("Please Select Payment By"),

  tdsAmount: Yup.string().matches(/^\d+$/, "Please Must Contain Number Only"),
  bankName: Yup.string().max(200, "Please Enter 200 Character Only"),

  refNo: Yup.string().max(150, "Please Enter 150 Character Only"),

  chequeNo: Yup.string().max(100, "Please Enter 100 Character Only"),

  invoiceCopy: Yup.mixed().when({
    is: value => {
      return value ? false : true
    },

    otherwise: Yup.mixed()
      .test(
        "fileSize",
        "File Size is too large",
        value => value && value.size <= 5242880
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        value => value && INVOICECOPY_SUPPORTEDFORMAT.includes(value.type)
      ),
  }),
})
export const addEmployeesValidation = Yup.object().shape({
  employeeId: Yup.string()
    .required("Please Enter Employee Id")
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Only Number and Letter")
    .max(150, "Please Enter 150  Character Only"),

  employeeName: Yup.string()
    .required("Please Enter Employee Name")
    .max(200, "Please Enter 200  Character Only"),

  dob: Yup.date().required("Please Select DOB!"),
  gender: Yup.string().required("Please Select valid Gender"),
  phoneNo: Yup.string()
    .required("please Enter Valid Phone Number")
    .matches(/^\d+$/, "Please  Must Contain Number Only.")
    .min(10, "Please Enter 10 Character")
    .max(10, "Please Enter 10 Character Only"),
  emailId: Yup.string()
    .required("Please Enter Email Id")
    .max(150, "Email must have less than 150 characters")
    .matches(
      /^[0-9a-zA-Z\s\r\n@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\?]+$/,
      "Please Must Contain Only Number, Letter and Special Character"
    ),

  maritalStatus: Yup.string().required("Please Select valid Marital Status"),
  doorNo: Yup.string()
    .required("Please Enter Door Number")
    .max(20, "Door Number  must have less than 20 characters")
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Only Number and Letter"),
  addressLine1: Yup.string()
    .required("Please Enter valid Address Line 1")
    .max(100, "Address Line 1 Must Have Less Than 100 Characters")
    .matches(/[a-zA-Z0-9\s]+/, "Please Must Contain Only Number and Letter"),

  addressLine2: Yup.string()
    .max(100, "Address Line 2 Must Have Less Than 100 Characters")
    .matches(/[a-zA-Z0-9\s]+/, "Please Must Contain Only Number and Letter"),

  district: Yup.string().required("Please Select valid District"),
  state: Yup.string().required("Please Select valid State"),

  pinCode: Yup.string()
    .matches(/^\d+$/, "Please  Must Contain Number Only.")
    .min(6, "PinCode Must Contain 6 Digits")
    .max(6, "PinCode Must Contain 6 Digits Only"),

  aadhaarNo: Yup.string()
    .required("Please Enter valid Aadhaar Number")
    .matches(/^\d+$/, "Please  Must Contain Number Only.")
    .min(12, "Aadhaar Number Must Contain 12 Digits")
    .max(12, "Aadhaar Number Must Contain 12 Digit Only"),

  panNo: Yup.string()
    .min(10, "PAN Number Must Contain 10 Digits")
    .max(10, "PAN Number Must Contain 10 Digit Only")
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Only Number and Letter"),
  designation: Yup.string().required("Please Select Designation"),
  department: Yup.string().required("Please Select Department"),
  location: Yup.string()
    .required("Please Enter Location")
    .max(200, "Please Enter 200 Character Only"),
  doj: Yup.date().required("Please Select DOJ!"),
  role: Yup.date().required("Please Select Role!"),
  isActive: Yup.string().required("Please  Active Now!"),
})

export const employeeLeaveValidation = Yup.object().shape({
  name: Yup.string()
    .required("Please Enter Name")

    .max(200, "Please Enter 200  Character Only"),

  employeeId: Yup.string()
    .required("Please Enter Employee Id")
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Only Number and Letter")
    .max(150, "Please Enter 150  Character Only"),
  designation: Yup.string()
    .required("Please Enter Designation")

    .max(150, "Please Enter 150  Character Only"),
  leaveType: Yup.string().required("Please Select Leave Type"),

  startDate: Yup.date().required("Please Select valid Start Date!"),
  endDate: Yup.date()
    .when("startDate", (startDate, schema) => {
      return (
        startDate &&
        schema.min(
          startDate,
          "End Date should be greater or equal to Effective From"
        )
      )
    })
    .nullable()
    .required("Please Select valid End Date!"),

  numberOfLeaves: Yup.number().required("Please Enter Number Of Days"),

  reasonForLeave: Yup.string()
    .required("Please Enter Reason For Leave")
    .max(300, "Please Enter 300 Character Only"),
})

export const stockEntryValidation = Yup.object().shape({
  date: Yup.date().required("Please Select Date"),
  poNo: Yup.string().required("Please Select PO No"),
  vendor: Yup.string().required("Please Select Vendor"),
  deliveryOn: Yup.string().required("Please Select Date"),

  deliveryChallan: Yup.mixed()
    .required("Please Upload Delivery Challan Photo!")
    .test(
      "fileSize",
      "File Size is too large",
      value => value && value.size <= 5242880
    ),
})

export const DemandRecoveryValidation = Yup.object().shape({
  Division: Yup.string().required("Please Select valid Division!"),
  Month: Yup.string().required("Please Select valid Month!"),
  Year: Yup.string().required("Please Select valid Year!"),
  PaidAccount: Yup.string().required("Please Select valid Paid Account!"),
  AmountReceived: Yup.number().required("Please Enter valid  Amount!"),
  RecoverySheet: Yup.mixed()
    .required("Please Select valid Recovery Sheet!")
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && EXCEL_SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      "fileSize",
      "File Size is too large!",
      value => value && value.size <= 5242880
    ),
})
export const AssetValidation = Yup.object().shape({
  Name: Yup.string()
    .required("Please Enter valid  Name")
    .max(200, "Name must have less than 200 characters"),
  Code: Yup.string()
    .required("Please Enter valid  Code")
    .max(50, "Name must have less than 50 characters"),
  AssetCategory: Yup.string().required("Please Select valid Asset Category!"),
  GLAccounts: Yup.string().required("Please Select valid GL Accounts!"),
  Cost: Yup.number().required("Please Enter valid  Cost"),
  BasicPrice: Yup.number().required("Please Enter valid  Basic Price"),
  GSTSlab: Yup.number().required("Please Enter valid  GST Slab"),
  HSNCode: Yup.number().required("Please Enter valid  HSN Code"),
  AvailableCount: Yup.number().required("Please Enter valid  Available Count"),
})
export const StationaryManagementValidation = Yup.object().shape({
  Name: Yup.string()
    .required("Please Enter valid  Name")
    .max(200, "Name must have less than 200 characters"),
  Code: Yup.string()
    .required("Please Enter valid  Code")
    .max(50, "Name must have less than 50 characters"),
  Cost: Yup.number().required("Please Enter valid  Cost"),
  OpeningStock: Yup.string().required("Please Enter valid  Opening Stock"),
  GSTSlab: Yup.number().required("Please Enter valid  GST Slab"),
  HSNCode: Yup.number().required("Please Enter valid  HSN Code"),
  AvailableCount: Yup.number().required("Please Enter valid  Available Count"),
})
export const voucherEntryValidation = Yup.object().shape({
  Date: Yup.date().required("Please Select valid Date!"),
  PaymentMode: Yup.string().required("Please Select valid Payment Mode!"),
  ChequeDate: Yup.date().when("PaymentMode", (PaymentMode, schema) => {
    return PaymentMode && PaymentMode === "Cheque"
      ? schema.required("Please Fill the Cheque Date")
      : schema.notRequired()
  }),
  BankName: Yup.string()
    .required("Please Enter valid  Bank Name")
    .max(150, "Name must have less than 150 characters"),
})
export const AssignValidationSchema = Yup.object().shape({
  IssuedDate: Yup.date().required("Please Select valid Issued Date!"),
  DueDate: Yup.date()
    .when("IssuedDate", (IssuedDate, schema) => {
      return (
        IssuedDate &&
        schema.min(
          IssuedDate,
          "Due Date should be greater or equal to Issued Date"
        )
      )
    })
    .nullable()
    .required("Please Select valid Due Date!"),
  Organization: Yup.string().required("Please Enter valid Organization"),
})
export const ReturnValidationSchema = Yup.object().shape({
  ReferenceNumber: Yup.string()
    .matches(
      /^[0-9a-zA-Z]+$/,
      "Member ID Must Contain Only Numbers and Letters"
    )
    .max(250, "Please Enter 250 Character Only")
    .required("Please Enter valid Reference Number"),
  Author: Yup.string().required("Please Enter valid  Author Name"),
  BookName: Yup.string().required("Please Enter valid  Book Name"),
})
export const DemandGenertionValidation = Yup.object().shape({
  Division: Yup.string().required("Please Select valid Division!"),
  Month: Yup.string().required("Please Select valid Month!"),
  Year: Yup.string().required("Please Select valid Year!"),
  SubDivision: Yup.string().required("Please Select valid Sub Division!"),
})
export const DayBookValidation = Yup.object().shape({
  From: Yup.date().required("Please Select valid From!"),
})

export const addStockEntryValidation = Yup.object().shape({
  item: Yup.string()
    .required("Please Enter Item")
    .max(200, "Please Enter 200  Character Only"),
  available: Yup.string().required("Please Enter Available"),

  quantityToBeAdded: Yup.string()
    .required("Please Enter Quantity To Be Added")
    .matches(/^\d+$/, "Quantity  Must Contain Number Only"),

  total: Yup.string().required("Please Enter Total"),
})

export const divisionValidation = Yup.object().shape({
  divisionName: Yup.string()
    .required("Please Enter Division!")
    .max(200, "Please Enter 200 Character Only"),
  description: Yup.string().max(250, "Please Enter 250 Character Only"),
})
export const subDivisionValidation = Yup.object().shape({
  subDivisionName: Yup.string()
    .required("Please Enter Sub-Division!")
    .max(200, "Please Enter 200 Character Only"),
  description: Yup.string().max(250, "Please Enter 250 Character Only"),
})
export const generalLedgerValidation = Yup.object().shape({
  startDate: Yup.date().required("Please Select valid Start Date!"),
  endDate: Yup.date()
    .when("startDate", (startDate, schema) => {
      return (
        startDate &&
        schema.min(
          startDate,
          "End Date should be greater or equal to Start Date"
        )
      )
    })
    .nullable()
    .required("Please Select valid End Date!"),
  accountNo: Yup.string("Please Select Account Number"),
  accountGroup: Yup.string("Please Select Account Group"),
})

export const ledgerDetailsValidation = Yup.object().shape({
  from: Yup.date().required("Please Select valid Start Date!"),
  to: Yup.date()
    .when("from", (from, schema) => {
      return (
        from &&
        schema.min(from, "To Date should be greater or equal to From Date")
      )
    })
    .nullable()
    .required("Please Select valid To Date!"),
  type: Yup.string("Please Select Type"),
  ledgerbox1: Yup.string("Please Enter Ledger"),
  ledgerbox2: Yup.string("Please Enter Ledger"),
  ledgerbox3: Yup.string("Please Enter Ledger"),
})

export const transactionEntryValidation = Yup.object().shape({
  memberNo: Yup.string().required("Please Search Member Number"),
  memberName: Yup.string().required("Please Search Member Name"),
  transactionDate: Yup.date().required("Please Select Date"),
  transactionNumber: Yup.string().required("Please Enter Number"),
  payment1: Yup.string()
    .required("Please Enter Payment")
    .max(100, "Please Enter 100 Character Only")
    .matches(/^\d+$/, "Payment Must Contain Number Only"),
  payment2: Yup.string()
    .required("Please Enter Payment")
    .max(100, "Please Enter 100 Character Only")
    .matches(/^\d+$/, "Payment Must Contain Number Only"),
  payment3: Yup.string()
    .required("Please Enter Payment")
    .max(100, "Please Enter 100 Character Only")
    .matches(/^\d+$/, "Payment Must Contain Number Only"),
  mode: Yup.string().required("Please Select Mode"),
  amount: Yup.string()
    .required("Please Enter Amount")
    .max(50, "Please Enter 50 Character Only")
    .matches(/^\d+$/, "Amount Must Contain Number Only"),
  number: Yup.string()
    .required("Please Enter Number")
    .max(100, "Please Enter 100 Character Only")
    .matches(/^\d+$/, "Number Must Contain Number Only"),
  prefix: Yup.string()
    .required("Please Enter Prefix")
    .max(100, "Please Enter 100 Character Only")
    .matches(/^\d+$/, "Prefix Must Contain Number Only"),
  srNo: Yup.string()
    .required("Please Enter Sr.No")
    .max(50, "Please Enter 50 Character Only")
    .matches(/^[0-9a-zA-Z]+$/, "Please Must Contain Only Number and Letter"),
  bank: Yup.string().max(200, "Please Enter 200 Character Only"),
})
export const loanApplicationValidation = Yup.object().shape({
  loanDate: Yup.string().required("Please Select Date"),
  product: Yup.string().required("Please Select Product"),
  requestingAmount: Yup.string()
    .required("Please Enter Required Amount")
    .matches(/^\d+$/, "Required Amount Must Contain Number Only"),
  netWeight: Yup.string()
    .required("Please Enter Net Weight")
    .matches(/^\d+$/, "Net Weight Must Contain Number Only"),
  totalWeight: Yup.string()
    .required("Please Enter Total Weight")
    .matches(/^\d+$/, "Total Weight Must Contain Number Only"),

  jewelImage: Yup.mixed().when({
    is: value => {
      return value ? false : true
    },

    otherwise: Yup.mixed()
      .test(
        "fileSize",
        "File Size is too large",
        value => value && value.size <= 5242880
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  }),
  appraisalValue: Yup.string()
    .required("Please Enter Appraisal Value")
    .matches(/^\d+$/, "Appraisal Value Must Contain Number Only"),
  sanctionedAmount: Yup.string()
    .required("Please Enter Sanctioned Amount")
    .matches(/^\d+$/, "Sanctioned Amount Must Contain Number Only"),
  rateOfInterest: Yup.string()
    .required("Please Enter Rate Of Interest")
    .matches(/^\d+$/, "Rate Of Interest Must Contain Number Only"),
  interestAmount: Yup.string()
    .required("Please Enter Interest Amount")
    .matches(/^\d+$/, "Interest Amount Must Contain Number Only"),
  netAmountPayable: Yup.string()
    .required("Please Enter Net Amount Payable")
    .matches(/^\d+$/, "Net Amount Payable Must Contain Number Only"),
  deductions: Yup.string()
    .required("Please Enter Deductions")
    .matches(/^\d+$/, "Deduciotns Must Contain Number Only")
    .max(20, "Please Enter 20 Character Only"),
  bankCharges: Yup.string()
    .matches(/^\d+$/, "Bank Charges Must Contain Number Only")
    .max(20, "Please Enter 20 Character Only"),
  gst: Yup.string()
    .required("Please Enter GST")
    .matches(/^\d+$/, "GST Must Contain Number Only")
    .max(20, "Please Enter 20 Character Only"),
  paymentMode: Yup.string().required("Please Select Payment Mode"),
  date: Yup.string().required("Please Select Date"),
  bank: Yup.string()
    .required("Please Enter Bank")
    .max(200, "Please Enter 200 Character Only"),
  valueDate: Yup.string().required("Please Select Date"),
  creditedDate: Yup.string().required("Please Select Date"),
})

export const particularsValidation = Yup.object().shape({
  name: Yup.string()
    .required("Please Enter Name")
    .max(100, "Please Enter 100 Character Only"),

  quantity: Yup.string()
    .required("Please Enter Quantity")
    .matches(/^\d+$/, "Quantity Must Contain Number Only")
    .max(50, "Please Enter 50 Character Only"),
  description: Yup.string().max(200, "Please Enter 200 Character Only"),
})
export const LoanValidation = Yup.object().shape({
  Member: Yup.string("Please Enter valid Member"),
  Product: Yup.string("Please Select valid Product"),
  NetPay: Yup.string("Please Enter valid Net Pay"),
  DRO: Yup.string("Please Enter valid DRO"),
  AppliedDate: Yup.date().required("Please Select valid Applied Date!"),
  RequestedAmount: Yup.string()
    .matches(/^[0-9]+$/, "Requested Amount Must Contain Only Numbers ")
    .required("Please Enter valid Requested Amount!"),
  EligibleAmount: Yup.string().required("Please Enter valid Eligible Amount!"),
  SanctionAmount: Yup.string()
    .matches(/^[0-9]+$/, "Sanction Amount Must Contain Only Numbers ")
    .required("Please Enter valid Sanction Amount!"),
  Reason: Yup.string().required("Please Enter valid Reason!"),
  Tenure: Yup.string().required("Please Enter valid Tenure!"),
  PaymentMode: Yup.string().required("Please Select valid Payment Mode!"),
  Date: Yup.date().required("Please Select valid Date!"),
})
export const BookValidation = Yup.object().shape({
  bookImage: Yup.mixed()
    .test(
      "fileSize",
      "File Size is too large",
      value => value && value.size <= 5242880
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  bookName: Yup.string().required("Please Enter Book Name"),
  Category: Yup.string().required("Please Enter Category"),
  refNo: Yup.string().required("Please Enter Reference Number"),
  publisher: Yup.string().required("Please Enter Publisher"),
  author: Yup.string().required("Please Enter Author"),
  price: Yup.string().required("Please Enter Price"),
  edition: Yup.string().required("Please Enter Edition"),
  pages: Yup.string().required("Please Enter Pages"),
})
export const voucherModalValidation = Yup.object().shape({
  Type: Yup.string().required("Please Enter Type"),
  MemberNumber: Yup.string().required("Please Enter Member Number"),
  AccountNumber: Yup.string().required("Please Enter Account Number"),
  Payment: Yup.string().required("Please Enter Payment"),
  Recipts: Yup.string().required("Please Enter Recipts"),
})
export const designationValidation = Yup.object().shape({
  designation: Yup.string().required("Please Enter A Designation!"),
  description: Yup.string().required("Please Add A Description!"),
})
export const expenseValidation = Yup.object().shape({
  date: Yup.object().required("Please Enter A Date!"),
  amount: Yup.object().required("Please Enter An Expense Amount!"),
  vendor: Yup.object().required("Please Enter A Valid Vendor!"),
  custName: Yup.object().required("Please Enter The Name Of The Customer!"),
  expenseCategory: Yup.object().required("Please Enter A Category!"),
  expenseAcc: Yup.object().required("Please Choose An Account!"),
  invoiceAmt: Yup.object().required("Please Enter An Amount For Invoice!"),
  paymentMode: Yup.object().required("Please Select A Payment Mode!"),
})
export const structureValidation = Yup.object().shape({
  empCode: Yup.object().required("Please Enter The Employee Code!"),
  division: Yup.object().required(
    "Please Enter The Division The Member Is In!"
  ),
  subDiv: Yup.object().required("Please Enter The Sub Division!"),

  basic: Yup.object().required("Please Enter The Basic Pay!"),
  ea: Yup.object().required("Please Enter The EA Required!"),
  da: Yup.object().required("Please Enter The DA Required!"),
  othAllo: Yup.object().required("Please Enter The Allowance!"),
  deductions: Yup.object().required("Please Enter The Deductions!"),
  totPay: Yup.object().required("Please Enter The Total Pay Received!"),
  netPay: Yup.object().required("Please Enter The Net Pay Received!"),
  salaryDetailsDocument: Yup.object().required(
    "Please Uplead The Salary Details!"
  ),
})

export const amountDepositValidation = Yup.object().shape({
  accountNo: Yup.string()
    .min(11, "Please Enter Atleast 11 Character Only")
    .max(16, " Please Enter 16 Character Only")
    .matches(/^\d+$/, "Please Must Contain Only Number"),
  date: Yup.date().required("Please Select Date"),
  amount: Yup.string()
    .required("Please Enter Amount")
    .matches(/^\d+$/, "Please Must Contain Only Number"),
  paymentMode: Yup.string().required("Please Select Payment Mode"),
})
export const QuotationValidation = Yup.object().shape({
  vendor: Yup.string().required("Please Select valid vendor"),
  quotationNum: Yup.string().required("Please Enter valid Quotation Number"),
  Date: Yup.date().required("Please Select valid Date!"),
  SGST: Yup.number().required("Please Enter valid SGST"),
  CGST: Yup.number().required("Please Enter valid CGST"),
  quotationCopy: Yup.mixed()
    .required("Please Upload valid quotation  Copy")
    .test(
      "fileSize",
      "File Size is too large",
      value => value && value.size <= 5242880
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && DOCUMENT_SUPPORTED_FORMATS.includes(value.type)
    ),
})
export const QuotationModalValidation = Yup.object().shape({
  Name: Yup.string().required("Please Enter valid Name"),
  Quantity: Yup.number().required("Please Enter valid Quantity"),
  Price: Yup.number().required("Please Enter valid Price"),
})
export const MemberRegistrationValidation = Yup.object().shape({
  MemberDetails: Yup.mixed()
    .required("Please Upload valid Member Details file")
    .test(
      "fileSize",
      "File Size is too large",
      value => value && value.size <= 5242880
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && EXCEL_SUPPORTED_FORMATS.includes(value.type)
    ),
})
export const DepositValidation = Yup.object().shape({
  Type: Yup.string().required("Please Select valid Type"),
  AccountType: Yup.string().required("Please Select Account Type"),
  Member: Yup.string().required("Please Enter valid Member"),
  Amount: Yup.string().required("Please Enter valid Amount"),
  AccountNumber: Yup.string().required("Please Enter valid Account Number"),
  InterestRate: Yup.string().required("Please Enter valid Interest Rate"),
  TenureDays: Yup.string().required("Please Enter valid Tenure Days"),
  Date: Yup.date().required("Please Select valid Date!"),
  MaturityDate: Yup.date().required("Please Select valid Maturity Date!"),
  InterestPaymentFrequency: Yup.string().required(
    "Please Select valid Interest Payment Frequency"
  ),
  InterestAmount: Yup.string().required("Please Enter valid Interest Amount"),
  DoorNo: Yup.string().required("Please Enter valid Door No"),
  Name: Yup.string().required("Please Enter valid Name"),
  AddressLineOne: Yup.string().required("Please Enter valid Address Line 1"),
  Area: Yup.string().required("Please Select valid Area"),
  District: Yup.string().required("Please Select valid District"),
  State: Yup.string().required("Please Select valid State"),
  Pincode: Yup.string().required("Please Enter valid Pincode"),
})
export const DepositInterestDisbursementValidation = Yup.object().shape({
  DepositAccountNumber: Yup.string().required(
    "Please Enter valid Deposit Account Number"
  ),
  memberID: Yup.string().required("Please Enter valid Member ID"),
  acNo: Yup.string().required("Please Enter valid Account Number"),
  type: Yup.string().required("Please Enter valid Type"),
  Date: Yup.date().required("Please Select valid Date!"),
  amt: Yup.string().required("Please Enter valid Amount"),
  ROI: Yup.string().required("Please Enter valid ROI"),
  maturityDate: Yup.date().required("Please Select valid Maturity Date!"),
  maturityAmt: Yup.string().required("Please Enter valid Maturity Amount"),
  interestAmt: Yup.string().required("Please Enter valid Interest Amount"),
  paymentFreq: Yup.string().required("Please Enter valid Payment Frequency"),
  interestPaid: Yup.string().required("Please Enter valid Interest to be paid"),
  paymentMode: Yup.string().required("Please Select valid Payment Mode"),
})
export const LoanDisbursementRegisterValidation = Yup.object().shape({
  Date: Yup.date().required("Please Select valid Date!"),
  loanNo: Yup.string().required("Please Enter valid Loan Number"),
  memberNo: Yup.string().required("Please Enter valid Member Number"),
  name: Yup.string().required("Please Enter valid Member Name"),
  employeeNo: Yup.string().required("Please Enter valid Employee Number"),
  loanAmt: Yup.string().required("Please Enter valid Loan Amount"),
  installmentAmt: Yup.string().required(
    "Please Enter valid Installment Amount"
  ),
  oldloanAmt: Yup.string().required("Please Enter valid Old Loan Amount"),
  oldloanInterest: Yup.string().required(
    "Please Enter valid Old Loan Interest"
  ),
  otherDed: Yup.string().required("Please Enter valid Other Deductions"),
  shareAmt: Yup.string().required("Please Enter valid Share Amount"),
  entranceFees: Yup.string().required("Please Enter valid Enterence Fee"),
  netAmt: Yup.string().required("Please Enter valid Net Amount"),
})
export const StationaryUsageEntryValidation = Yup.object().shape({
  Date: Yup.date().required("Please Select valid Date!"),
})
export const PurchaseOrderEntryValidation = Yup.object().shape({
  Vendor: Yup.string().required("Please Select valid Vendor!"),
  PoNumber: Yup.string().required("Please Select valid Po Number!"),
  EmployeeID: Yup.string().required("Please Enter valid Employee ID"),
  Designation: Yup.string().required("Please Enter valid Designation"),
  PoCopy: Yup.mixed().required("Please Enter valid Po Copy"),
})
export const SuretyUpdateValidation = Yup.object().shape({
  memberID: Yup.string().required("Please Select valid member ID!"),
  suretyExisting: Yup.string().required("Please Select valid Surety Existing!"),
  suretyNew: Yup.string().required("Please Enter valid New Surety"),
})
export const ApproveLeaveValidation = Yup.object().shape({
  EmployeeID: Yup.string().required("Please Enter valid Employee ID"),
  Designation: Yup.string().required("Please Enter valid Designation"),
})
