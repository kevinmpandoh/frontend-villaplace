import Link from 'next/link';

const BackButton: React.FC = () => {
  return (
    <Link href="/" passHref>
      <button 
        className="inline-flex items-center gap-2 justify-center px-3 py-2 rounded-lg hover:bg-green-100 border-2 border-primary text-primary font-semibold text-center"
        aria-label='Back'
      >
          <p>Back</p>
      </button>
    </Link>
  );
};

export default BackButton;