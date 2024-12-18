import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const BackButton: React.FC = () => {
  return (
    <Link href="/" passHref>
      <a 
        className="inline-flex items-center gap-2 justify-center px-3 py-2 rounded-lg hover:bg-green-100 border-2 border-primary text-primary font-semibold text-center"
        aria-label='Back'
      >
          <FontAwesomeIcon icon={faArrowLeft} data-testid="fa-arrow-left" />
          <span>Back</span>
      </a>
    </Link>
  );
};

export default BackButton;