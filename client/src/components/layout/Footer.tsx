import Container from "./Container";

function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-400">
      <Container>
        © {new Date().getFullYear()} NexMeet. Built with ❤️ using React &
        TypeScript.
      </Container>
    </footer>
  );
}

export default Footer;