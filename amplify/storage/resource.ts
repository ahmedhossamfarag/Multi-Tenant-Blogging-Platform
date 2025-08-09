import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'blogStorage',
  access: (allow) => ({
    'posts-images/{entity_id}/*': [
      allow.guest.to(['read']),
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
  })
});