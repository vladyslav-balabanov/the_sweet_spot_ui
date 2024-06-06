import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';

type ContextValue = {
    user: UserStore;
} | null;

export const Context = createContext<ContextValue>(null);

const RootComponent: React.FC = () => {
    return (
        <Context.Provider value={{
            user: new UserStore()
        }}>
            <App />
        </Context.Provider>
    );
};

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(<RootComponent />);