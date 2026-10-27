import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col justify-center py-24">
      <p className="eyebrow mb-6">404</p>
      <h1 className="display max-w-4xl text-[clamp(3rem,9vw,8rem)]">
        This frame <span className="text-violet">dropped.</span>
      </h1>
      <p className="mt-6 max-w-lg text-lg text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/">Back home</Button>
        <Button href="/work/" variant="secondary">
          See the work
        </Button>
      </div>
    </div>
  );
}
