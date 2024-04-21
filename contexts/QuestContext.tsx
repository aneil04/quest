import React, { useContext, useState, useEffect } from 'react'

interface QuestContextProvider {
  completedQuest: boolean;
  setCompletedQuest: Function;
  dailyQuest: string; 
}

const QuestContext = React.createContext<QuestContextProvider>({ dailyQuest: "", completedQuest: false, setCompletedQuest: () => { } });

export function useQuestContext() {
  return useContext(QuestContext);
}


export function QuestProvider({ children }: any) {
  const [completedQuest, setCompletedQuest] = useState<boolean>(false)
  const [dailyQuest, setDailyQuest] = useState<string>("")

  useEffect(() => {
    async function fetchDailyQuest() {
      try {
        const response = await fetch('https://getquest-mpzx6jfkja-uc.a.run.app');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDailyQuest(data[0].description);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    fetchDailyQuest();
  }, []);

  const value = {
    completedQuest,
    setCompletedQuest,
    dailyQuest
  }

  return (
    <QuestContext.Provider value={value}>
      {children}
    </QuestContext.Provider>
  )
}