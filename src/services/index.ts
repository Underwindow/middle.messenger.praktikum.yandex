export { default as initApp } from './initApp';
export { login, logout, signUp } from './auth';
export { changeProfile, changeAvatar, changePassword, searchUsers, getUser } from './user';
export { addChatUsers, deleteChatUsers, getChats, createChat, getChatUsers, connectUserToChat as connectUser, sendMessage, loadOldMessages } from './chats';