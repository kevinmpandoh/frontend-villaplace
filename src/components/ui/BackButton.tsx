import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faArrowLeft 
} from '@fortawesome/free-solid-svg-icons';

const BackButton = () => {
  return (
    
    <Link href="/">
        <button className="inline-flex items-center gap-2 justify-center px-3 py-2 rounded-lg hover:bg-green-100 border-2 border-primary text-primary font-semibold text-center">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back</span>
        </button>
    </Link>
  );
};

export default BackButton;