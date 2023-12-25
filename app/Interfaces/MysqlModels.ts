import { DateTime } from 'luxon'

export interface LocationsInterface {
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

export interface ClientAdminInterface {
  id?: number
  clientCode: string
  userCode: string
  companyCode: string
  createdAt: string | null
  updatedAt?: string | null
}

export interface ClientsInterface {
  code: string
  name: string
  subscriptionCode?: string
  createdAt: string | null
  updatedAt?: string | null
}

export interface CodeVerificationsInterface {
  code: string
  userCode: string
  codeType: 'registration' | 'login' | 'forgot-password'
  ttl: string | null
  createdAt: string | null
  updatedAt?: string | null
}

export interface CompaniesInterface {
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

export interface DepartementsInterface {
  code: string
  companyCode: string
  name: string
  description: string
  createdAt: string | null
  updatedAt?: string | null
}

export interface DepartementManagersInterface {
  id: number | null
  companyCode: string
  departementCode: string
  employeeCode: string
  createdAt: string | null
  updatedAt?: string | null
}

export interface EmployeeAttendancesInterface {
  id: number | null
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

export interface EmployeeInterface {
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

export interface ProfilesInterface {
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

export interface ShiftTypesInterface {
  code: string
  companyCode: string
  name: string
  description?: string
  clockIn: string // time Format: HH:mm
  clockOut: string // time Format: HH:mm
  createdAt: string | null
  updatedAt?: string | null
}

export interface SubscriptionFeaturesInterface {
  id: number | null
  subscriptionCode: string
  feature: string
  status: string
  sortIndex: number
  createdAt: string | null
  updatedAt?: string | null
}

export interface SubscriptionsInterface {
  code: string
  name: string
  description?: string
  price?: string
  createdAt: string | null
  updatedAt?: string | null
}

export interface UserAccountsInterface {
  code: string
  companyCode: string
  username: string
  email: string
  password: string
  permissionType: 'basic-user' | 'employee' | 'manager' | 'other'
  status: 'active' | 'blocked' | 'pending-confirmation' | 'suspend'
  trashStatus: boolean
  createdAt: string | null
  updatedAt?: string | null
}

export interface UserActivitiesInterface {
  id: number | null
  userCode: string
  date?: string | null
  type?: 'login' | 'forgot-password' | 'other'
  detail?: string
  createdAt: string | null
  updatedAt?: string | null
}

export interface TasksEmailSenderInterface {
  id: number | null
  uuid: string | null
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
  updatedAt?: string | null
}

export interface UserTokensInterface {
  id: number | null
  userCode: string
  token: string
  ttl?: DateTime
  createdAt: string | null
  updatedAt: string | null
}
