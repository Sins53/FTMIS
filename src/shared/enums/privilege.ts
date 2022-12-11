export enum PRIVILEGESCREEN {
  MASTERCONFIGURATION = 'master-configuration',
  // STOCK_CONFIGURATION="stock-configuration",
  ROLE_MANAGEMENT = 'role-management',
  CATEGORY = 'category',
  SUBCATEGORY = 'sub-category',
  ROLE = 'role-configuration',
  ADMIN = 'admin-configuration',
  DASHBOARD = 'dashboard',
  CODE = 'master-code',
  UNIT_CONFIGURATION = 'unit-configuration',
  STOCK_CONFIGURATION = 'stocks',
  REQUISITION = 'requisition-management',
  ASSETS_MANAGEMENT = 'assets-management'
}

export enum PRIVILEGEMODULE {
  CATEGORY = 'category',
  MODULE = 'module',
  SCREEN = 'screen',
  UNIT = 'unit',
  UNIT_CONFIGURATION = 'unit-configuration',
  STOCK_ITEM = 'stock-item',
  STOCK_SCHEMA = 'stock-schema',
  SPECIFIC_ITEMS = 'specific-items',
  STOCK_ITEM_VARIANT = 'stock-item-variant',
  // STOCK_ITEM_FORM = 'stock-item-form',
  CURRENT_STOCK_ITEMS = 'current-stock',
  ROLES = 'role',
  PRIVILEGE = 'privilege',
  ROLE = 'role',
  ADMIN = 'admin',
  ADMIN_SPECIFIC_ITEM = 'admin-specific-item',
  UNIT_TYPE = 'unit-type',
  UNIT_SETUP = 'unit-setup',
  UNIT_GROUP = 'unit-group',
  UNIT_CONVERSION = 'unit-conversion',
  SUBCATEGORY = 'sub-category',
  DEPARTMENT = 'department',
  MASTER_CODES = 'master-code',
  ACCESS_MAPPING = 'access-mapping',

  REQUISITIONS = 'requisitions',
  REQUISITIONS_APPROVAL = 'requisition-approval',
  APPROVAL_HIERARCHY = 'role-approval-hierarchy',
  STOCK_HISTORY = 'stock-history',

  ASSETS_ACQUISITION = 'my-requisitions',
  ASSETS_HANDOVER = 'assets-handover',
  ASSETS_RETURN = 'assets-return'
}

export enum PRIVILEGES {
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  CREATE = 'create',
  APPROVE = 'approve',
  CONFIGURE = 'configure',
  MAKE_DEFAULT = 'make-default'
}
