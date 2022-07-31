export class Node<T> {
  constructor(
    readonly data: T,
    public prev: Node<T> | null = null,
    public next: Node<T> | null = null
  ) {}
}