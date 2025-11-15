export function Logo({ size = 48 }: { size?: number }) {
  return (
    <img 
      src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/26c781d4-40a4-4a9e-bd99-0e139a1bc118.png" 
      alt="VamosJuntos Logo" 
      className="rounded-xl"
      style={{ width: size, height: size }}
    />
  );
}
