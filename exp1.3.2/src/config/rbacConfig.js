// Role-Based Access Control (RBAC) Configuration & Matrix (Exp 1.3.2)

export const ROLES = {
  ADMIN: 'Admin',
  EDITOR: 'Editor',
  VIEWER: 'Viewer',
};

export const PERMISSIONS = {
  POSTS_READ: 'posts:read',
  POSTS_CREATE: 'posts:create',
  POSTS_EDIT: 'posts:edit',
  POSTS_DELETE: 'posts:delete',
  STUDIO_ACCESS: 'studio:access',
  ADMIN_ACCESS: 'admin:access',
  SYSTEM_CONFIGURE: 'system:configure',
  USERS_MANAGE: 'users:manage',
};

export const ROLE_PERMISSIONS_MAP = {
  [ROLES.ADMIN]: [
    PERMISSIONS.POSTS_READ,
    PERMISSIONS.POSTS_CREATE,
    PERMISSIONS.POSTS_EDIT,
    PERMISSIONS.POSTS_DELETE,
    PERMISSIONS.STUDIO_ACCESS,
    PERMISSIONS.ADMIN_ACCESS,
    PERMISSIONS.SYSTEM_CONFIGURE,
    PERMISSIONS.USERS_MANAGE,
  ],
  [ROLES.EDITOR]: [
    PERMISSIONS.POSTS_READ,
    PERMISSIONS.POSTS_CREATE,
    PERMISSIONS.POSTS_EDIT,
    PERMISSIONS.STUDIO_ACCESS,
  ],
  [ROLES.VIEWER]: [
    PERMISSIONS.POSTS_READ,
  ],
};

export const PRESET_PERSONAS = [
  {
    id: 'u-admin-1',
    name: 'Sarah Connor',
    email: 'admin@system.com',
    role: ROLES.ADMIN,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    description: 'Full System Administrator with complete read, write, delete, and security permissions.',
  },
  {
    id: 'u-editor-2',
    name: 'Alex Rivera',
    email: 'editor@system.com',
    role: ROLES.EDITOR,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    description: 'Content Studio Editor with write & update rights. Restricted from deleting posts or configuring system settings.',
  },
  {
    id: 'u-viewer-3',
    name: 'Elena Rostova',
    email: 'viewer@system.com',
    role: ROLES.VIEWER,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    description: 'Read-Only Viewer persona. Restricted from mutating content or accessing protected routes.',
  },
];
