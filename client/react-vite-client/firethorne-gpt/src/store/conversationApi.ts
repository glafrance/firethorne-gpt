import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Prompt {
  id: string;
  prompt: string;
}

export interface FirstPrompts {
  firstPrompts: Prompt[];
}

export interface ConversationItem {
  id: string;
  prompt: string;
  response: string;
}

export interface Conversation {
  _id: string;
  items: ConversationItem[];
  createdAt: string;
}

export const conversationApi = createApi({
  reducerPath: 'conversationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3100/conversation' }),
  endpoints: (builder) => ({
    getFirstPrompts: builder.query<FirstPrompts, void>({
      query: () => '/first-prompts',
    }),
    getConversationById: builder.query<Conversation, string>({
      query: (id) => `/${id}`,
    }),
    createConversation: builder.mutation<Conversation, void>({
      query: () => ({
        url: '/',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetFirstPromptsQuery,
  useGetConversationByIdQuery,
  useCreateConversationMutation,
} = conversationApi;
