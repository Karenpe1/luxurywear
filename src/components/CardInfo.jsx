import React from 'react'
import styleCradInfo from "../styles/CardInfo.module.css"

const CardInfo = ({title, subtitle, total}) => {
  return (
    <div className={styleCradInfo.contenedorCardInfo}>
        <h2 className={styleCradInfo.title}>{title}</h2>
        <h6 className={styleCradInfo.subtitle}>{subtitle}</h6>
        <h2 className={styleCradInfo.total}>{total}</h2 >
    </div>
  )
}

export default CardInfo