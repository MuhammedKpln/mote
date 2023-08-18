interface IProps {
  navigateBackToNotes: () => void;
}

export function TagsSidebar(props: IProps) {
  return (
    <ul>
      <li>selam</li>

      <button onClick={props.navigateBackToNotes}>selam</button>
    </ul>
  );
}
