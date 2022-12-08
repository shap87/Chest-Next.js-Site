export interface IFolder {
  children: { type: string, name: string, children: [] }[],
  type: string,
  name: string
}