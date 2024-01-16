export class CreateNoteRequest {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
  ) {}
}
