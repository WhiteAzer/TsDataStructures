export type graphData = string | number

export class Vertex {
  constructor(
    readonly to: graphData,
    readonly weight: number
  ) {
  }
}