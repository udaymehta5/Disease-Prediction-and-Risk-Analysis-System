import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am your AI Health Assistant. How are you feeling today? Please describe your symptoms, when they started, or any discomfort you are experiencing.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ],
  loading: false,
  error: null
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      // action.payload: { sender: 'user' | 'ai', text: string }
      state.messages.push({
        id: Date.now() + Math.random(),
        sender: action.payload.sender,
        text: action.payload.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearChat: (state) => {
      state.messages = [
        {
          id: 1,
          sender: 'ai',
          text: 'Chat history cleared. How can I help you assess your symptoms today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
      state.error = null;
      state.loading = false;
    }
  }
});

export const { addMessage, setLoading, setError, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
