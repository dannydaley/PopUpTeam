import Button from '../Button';
import Container from '../Container';

export default function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <img
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src="../images/background-call-to-action.jpg"
        alt=""
        width={2347}
        height={1244}
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get started today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            It’s time to take control of your team. Sign up today and see the creatives online today.
          </p>
          <Button href="/business-register" color="white" className="mt-10">
            Build your team today
          </Button>
        </div>
      </Container>
    </section>
  );
};
