import styles from "../styles/Search.module.css";

const Search = () => {
  return (
    <div className={styles.container}>
        <div className={styles.inner}>
            <p className={styles.title}>Descubre el vestido perfecto para cada ocasión.</p>
            <div className={styles.search}>
                <input className={styles.input} type="text" placeholder="Escribe el tipo de vestido ideal."/>
                <img className={styles.lens} src="lens.svg"/>
            </div>
        </div>
    </div>
  )
}

export default Search;