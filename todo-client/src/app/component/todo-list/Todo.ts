export class Todo {
  id: number
  title: string
  targetedDate: Date
  description: string
  iscompleted: boolean
  constructor(id: number, title: string, targetedDate: Date, description: string, iscompleted: boolean) {
    this.id = id
    this.title = title
    this.targetedDate = targetedDate
    this.description = description
    this.iscompleted = iscompleted
  }
}