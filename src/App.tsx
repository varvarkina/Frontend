import styles from "./App.module.css"
import { SlidesList } from "./view/SlidesList.tsx"
import { TopPanel } from "./view/topPanel/TopPanel.tsx"
import { Workspace } from "./view/Workspace.tsx"
import { HistoryType } from './utils/history.ts';
import { HistoryContext } from './view/hooks/historyContext.ts';
import { GlobalListeners } from "./utils/initListeners.ts";

type AppProps = {
    history: HistoryType,
}

function App({ history }: AppProps) {
    return (
        <HistoryContext.Provider value={history}>
            <div style={{ position: 'relative', height: '100%' }}>
                <GlobalListeners history={history} />
                <TopPanel></TopPanel>
                <div className={styles.container}>
                    <SlidesList></SlidesList>
                    <Workspace></Workspace>
                </div>
            </div>
        </HistoryContext.Provider>
    )
}

export default App
