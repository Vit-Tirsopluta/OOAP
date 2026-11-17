import { StudyForm } from "./StudyForm.js";

/** Мешканець гуртожитку. Об'єкт заморожений, тож його дані не змінюються після поселення. */
export class Resident {
  /**
   * @param {{
   *   fullName: string,
   *   birthDate: string,
   *   faculty: string,
   *   group: string,
   *   studyForm: string,
   * }} params birthDate — у форматі РРРР-ММ-ДД; studyForm — значення StudyForm
   */
  constructor({ fullName, birthDate, faculty, group, studyForm }) {
    if (!Object.values(StudyForm).includes(studyForm)) {
      throw new RangeError(`Невідома форма навчання: ${studyForm}`);
    }

    this.fullName = fullName;
    this.birthDate = birthDate;
    this.faculty = faculty;
    this.group = group;
    this.studyForm = studyForm;
    Object.freeze(this);
  }

  /** Копія мешканця: нова незалежна від оригіналу, але з тими самими даними. */
  clone() {
    return new Resident(this);
  }
}
