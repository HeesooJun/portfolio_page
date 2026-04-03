import {
  ABOUT_INTRODUCTION,
  ABOUT_PRINCIPLES,
  ABOUT_PROFILE_NOTES,
} from '@/content/portfolio-content'

export default function AboutSection() {
  return (
    <section id="about" className="about_section">
      <div className="about_section__container">
        <div className="about_section__header">
          <p className="about_section__eyebrow">Archive 02</p>
          <h2 className="about_section__heading">About</h2>
          <p className="about_section__introduction">{ABOUT_INTRODUCTION}</p>
        </div>
        <div className="about_section__stage">
          <article className="about_section__profile_panel">
            <p className="about_section__profile_label">Perspective</p>
            <p className="about_section__profile_title">
              화면의 무드와 정보 구조가 동시에 읽히는 인터페이스를 지향합니다.
            </p>
            <ul className="about_section__profile_notes">
              {ABOUT_PROFILE_NOTES.map((item) => (
                <li key={item} className="about_section__profile_note">
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <ul className="about_section__list">
            {ABOUT_PRINCIPLES.map((item, index) => (
              <li key={item} className="about_section__item">
                <p className="about_section__item_index">{`0${index + 1}`}</p>
                <p className="about_section__item_copy">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
