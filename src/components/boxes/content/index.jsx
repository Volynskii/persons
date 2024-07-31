import styles from './content.module.scss';

const ContentBox = ({children}) => {
    return (
        <div className={styles.content}>
            {children}
        </div>
    );
};

export default ContentBox;