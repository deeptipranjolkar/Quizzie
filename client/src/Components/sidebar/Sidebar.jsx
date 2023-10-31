import styles from "./Sidebar.Module.css"

import { useDispatch } from "react-redux"
import { openCreateQuizBlock } from "../../Stores/quizzeSlice"

const Sidebar = () => {
  const isActive = true
  const dispatch = useDispatch()

  const handleCreateQuizClick = () => {
    dispatch(openCreateQuizBlock())
  }
  return (
    <div className={styles.sidebarContainer}>
      <h1 className={styles.icon}>Quizzie</h1>
      <ul className={styles.menuContainer}>
        <li
          className={`${styles.menuItemContainer} ${isActive ? styles.activeNav : null}`}
        >
          Dashboard
        </li>
        <li className={styles.menuItemContainer}>Analytics</li>
        <li className={styles.menuItemContainer}>Create Quiz</li>
      </ul>
      <div className={styles.logoutContainer}>
        <div className={styles.horizontalDivider}>
          <hr />
        </div>
        <button className={styles.logoutButton}>Logout</button>
      </div>
    </div>
  )
}

export default Sidebar;
