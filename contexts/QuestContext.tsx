import React, { useContext, useState } from 'react'

interface QuestContextProvider {
  completedQuest: boolean;
  setCompletedQuest: Function;
}

const QuestContext = React.createContext<QuestContextProvider>({ completedQuest: false, setCompletedQuest: () => { } });

export function useQuestContext() {
  return useContext(QuestContext);
}


export function QuestProvider({ children }: any) {
  const [completedQuest, setCompletedQuest] = useState<boolean>(false)

  const value = {
    completedQuest,
    setCompletedQuest
  }

  return (
    <QuestContext.Provider value={value}>
      {children}
    </QuestContext.Provider>
  )
}