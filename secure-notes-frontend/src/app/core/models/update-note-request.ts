export class UpdateNoteRequest {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
  ) {}
}
