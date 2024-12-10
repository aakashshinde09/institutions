export interface IMainProperties extends React.ComponentProps<'main'> {}
export function Main(props: IMainProperties) {
  return <main {...props}>{props.children}</main>
}
