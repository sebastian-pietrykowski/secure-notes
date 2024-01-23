export class CreateNoteRequest {
  constructor(
    public readonly title: string,
    public readonly content: string,
    public readonly creator: string,
    public readonly isEncrypted: boolean,
    public readonly password: string
  ) {}
}
