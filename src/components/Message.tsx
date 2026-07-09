import styles from "./Message.module.css";

interface MessageProps {
  message: string;
}

function Message({ message }: MessageProps): React.JSX.Element {
  return (
    <p className={styles.message}>
      <span role="img" aria-label="wave">
        👋
      </span>{" "}
      {message}
    </p>
  );
}

export default Message;
