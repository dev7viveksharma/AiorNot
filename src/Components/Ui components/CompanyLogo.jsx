import "./CompanyLogo.css";
export default function CompanyLogo(){
    return(
    <svg xmlns="http://w3.org" viewBox="0 0 540 100" width="100%" height="100%">
    <defs>
        <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00F2FE" />
        <stop offset="100%" stopColor="#4FACFE" />
        </linearGradient>

        <linearGradient id="humanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF5858" />
        <stop offset="100%" stopColor="#F093FB" />
        </linearGradient>

        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
    </defs>

    <g transform="translate(5, -2)">
        <path d="M 52 14 A 38 38 0 0 0 18 52 A 38 38 0 0 0 52 90 Z" fill="url(#aiGrad)" opacity="0.1" />
        <path d="M 52 14 A 38 38 0 0 0 18 52 A 38 38 0 0 0 52 90" fill="none" stroke="url(#aiGrad)" strokeWidth="3" strokeLinecap="round" />
        
        <path d="M 52 14 A 38 38 0 0 1 86 52 A 38 38 0 0 1 52 90 Z" fill="url(#humanGrad)" opacity="0.1" />
        <path d="M 52 14 A 38 38 0 0 1 86 52 A 38 38 0 0 1 52 90" fill="none" stroke="url(#humanGrad)" strokeWidth="3" strokeLinecap="round" />

        <g transform="translate(31, 31)">
        <rect x="0" y="0" width="13" height="10" rx="1" fill="none" stroke="#00F2FE" strokeWidth="1.5" />
        <line x1="3" y1="3" x2="8" y2="3" stroke="#00F2FE" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3" y1="6" x2="10" y2="6" stroke="#00F2FE" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    <g transform="translate(31, 61)">
      <rect x="0" y="1" width="10" height="8" rx="1" fill="none" stroke="#00F2FE" strokeWidth="1.5" />
      <polygon points="10,3 15,1 15,9 10,7" fill="none" stroke="#00F2FE" strokeWidth="1.5" strokeLinejoin="round" />
    </g>

    <g transform="translate(59, 31)">
      <rect x="0" y="0" width="13" height="10" rx="1" fill="none" stroke="#FF5858" strokeWidth="1.5" />
      <circle cx="3" cy="3" r="0.7" fill="#FF5858" />
      <polygon points="1,9 5,5 8,8 10,6 12,9" fill="none" stroke="#FF5858" strokeWidth="1.5" strokeLinejoin="round" />
    </g>

    <g transform="translate(61, 59)">
      <circle cx="2" cy="8" r="1.5" fill="none" stroke="#FF5858" strokeWidth="1.5" />
      <circle cx="10" cy="7" r="1.5" fill="none" stroke="#FF5858" strokeWidth="1.5" />
      <path d="M 3.5 8 L 3.5 2 L 11.5 1 L 11.5 7" fill="none" stroke="#FF5858" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    <line x1="52" y1="6" x2="52" y2="98" stroke="#4FACFE" strokeWidth="2" opacity="0.8" filter="url(#glow)" />
    </g>

    <g transform="translate(108, 62)">
        <text x="0" y="0" fontFamily="system-ui, -apple-system, sans-serif" fontSize="74" fontWeight="900" fill="url(#aiGrad)" letterSpacing="1">AI</text>
        <text x="88" y="-6" fontFamily="system-ui, -apple-system, sans-serif" fontSize="52" fontWeight="300" fill="#9CA3AF" fontStyle="italic">or</text>
        <text x="140" y="0" fontFamily="system-ui, -apple-system, sans-serif" fontSize="74" fontWeight="800" fill="url(#humanGrad)" letterSpacing="1">Not</text>
        <text x="2" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontSize="12" fontWeight="700" fill="#9CA3AF" letterSpacing="4.5">TEXT • IMAGE • AUDIO • VIDEO</text>
    </g>
    </svg>

    )
}