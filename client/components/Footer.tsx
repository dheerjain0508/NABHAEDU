export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-10 text-center text-sm text-muted-foreground">
        <div>© {new Date().getFullYear()} NABHA EDU. All rights reserved.</div>
        <div className="mt-2">Have content to add? Email us at <a href="mailto:content@nabhaedu.example" className="text-primary underline">content@nabhaedu.example</a> and our team will respond within 2-3 working days.</div>
      </div>
    </footer>
  );
}
