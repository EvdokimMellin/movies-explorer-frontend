function Techs() {
  return(
    <section className="technologies">
      <div className="section-title">
        <h2 className="section-title__content">Технологии</h2>
      </div>
      <article className="technologies__article">
        <h3 className="technologies__article-title">7 технологий</h3>
        <p className="technologies__article-content">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </article>
      <ul className="technologies__list">
        <li className="technologies__technology">HTML</li>
        <li className="technologies__technology">CSS</li>
        <li className="technologies__technology">JS</li>
        <li className="technologies__technology">React</li>
        <li className="technologies__technology">Git</li>
        <li className="technologies__technology">Express.js</li>
        <li className="technologies__technology">mongoDB</li>
      </ul>
    </section>
  )
}

export default Techs;
