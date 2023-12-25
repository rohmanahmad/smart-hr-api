import { DateTime } from 'luxon'

export type LocationsInterface = {
  code: string
  postalCode: string
  name: string
  negaraCode: string
  provinsiCode: string
  kabkotaCode?: string
  kecamatanCode?: string
  desaCode?: string
  createdAt: string | null
  updatedAt?: string | null
}

export type ClientAdminInterface = {
  id?: number
  clientCode: string
  userCode: string
  companyCode: string
  createdAt: string | null
  updatedAt?: string | null
}

export type ClientsInterface = {
  code: string
  name: string
  subscriptionCode?: string
  createdAt: string | null
  updatedAt?: string | null
}

export type CodeVerificationsInterface = {
  code: string
  userCode: string
  codeType: string
  ttl: string | null
  createdAt: string | null
  updatedAt?: string | null
}

export type CompaniesInterface = {
  code: string
  name: string
  description?: string
  address?: string
  locationCode?: string
  phoneNumber1?: string
  phoneNumber2?: string
  email?: string
  website?: string
  createdAt: string | null
  updatedAt?: string | null
}

export type DepartementsInterface = {
  code: string
  companyCode: string
  name: string
  description: string
  createdAt: string | null
  updatedAt?: string | null
}

export type DepartementManagersInterface = {
  _id: number
  companyCode: string
  departementCode: string
  employeeCode: string
  createdAt: string | null
  updatedAt?: string | null
}

export type EmployeeAttendancesInterface = {
  _id: number
  companyCode: string
  employeeCode: string
  shiftCode: string
  clockType: string
  date: DateTime
  clockInAt: string
  clockOutAt?: string
  locationCoordinate?: string
  status?: 'late' | 'ontime' | 'early' | 'absent' | 'sick' | 'permit'
  permitCode: string
  note?: string
  isApproved: boolean
  createdAt: string | null
  updatedAt?: string | null
}

export type EmployeeInterface = {
  code: string
  companyCode: string
  userCode: string
  departementCode: string
  profileCode: string
  employmentStatus: string
  salary: string
  jobPosition?: string
  hireDate?: string
  createdAt: string | null
  updatedAt?: string | null
}

export type ProfilesInterface = {
  code: string
  firstName?: string
  lastName?: string
  pictureUrl?: string
  address?: string
  locationCode?: string
  birthDate?: string
  gender?: string
  createdAt: string | null
  updatedAt?: string | null
}

export type ShiftTypesInterface = {
  code: string
  companyCode: string
  name: string
  description?: string
  clockIn: string // time Format: HH:mm
  clockOut: string // time Format: HH:mm
  createdAt: string | null
  updatedAt?: string | null
}

export type SubscriptionFeaturesInterface = {
  _id: number
  subscriptionCode: string
  feature: string
  status: string
  sortIndex: number
  createdAt: string | null
  updatedAt?: string | null
}

export type SubscriptionsInterface = {
  code: string
  name: string
  description?: string
  price?: string
  createdAt: string | null
  updatedAt?: string | null
}

export type UserAccountsInterface = {
  code: string
  companyCode: string
  username: string
  email: string
  password: string
  permissionType: 'basic-user' | 'employee' | 'manager' | 'other'
  status: string
  trashStatus: boolean
  createdAt: string | null
  updatedAt?: string | null
}

export type UserActivitiesInterface = {
  _id: number
  userCode: string
  date?: DateTime
  type?: 'login' | 'forgot-password' | 'other'
  detail?: string
  createdAt: string | null
  updatedAt?: string | null
}

export type TasksEmailSender = {
  id: number
  uuid: string
  sentAsEmail: string
  sentAsName: string
  email: string
  cc?: string
  bcc?: string
  subject: string
  isHTML: boolean
  status: 'pending' | 'sent' | 'cancel'
  templateName: string
  contentData: string
  createdAt: string | null
  updatedAt: string | null
}
