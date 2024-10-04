type SocialProps = {
    image: string;
    socialName: string;
    link: string;
}

export function Social({ image, socialName, link }: SocialProps) {
    return (
        <a href={link} target="_blank" rel="noreferrer">
            <img src={image} alt={socialName} />
        </a>
      );
}
