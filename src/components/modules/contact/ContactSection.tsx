import { Clock3, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="py-2 text-5xl font-bold">
          Contact <span className="text-muted-foreground">Medica</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Need help with orders, medicines, or account support? Reach out to our
          team through the channels below.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-5">
        <Card className="rounded-xl border-primary/20 md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle>Support Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p>support@medica.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="font-medium text-foreground">Phone</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="font-medium text-foreground">Address</p>
                <p>123 Health Avenue, Care City, USA</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock3 className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="font-medium text-foreground">Support Hours</p>
                <p>Sunday - Thursday, 9:00 AM - 8:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Before You Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="rounded-lg border bg-muted/35 p-3">
              <p className="font-medium text-foreground">Fastest response</p>
              <p className="mt-1">
                For account or order issues, email us with your order ID to get
                quicker support.
              </p>
            </div>
            <div className="rounded-lg border bg-muted/35 p-3">
              <p className="font-medium text-foreground">Average reply time</p>
              <p className="mt-1">We usually respond within 2-6 business hours.</p>
            </div>
            <div className="flex items-start gap-2 rounded-lg border bg-primary/5 p-3">
              <ShieldCheck className="mt-0.5 size-4 text-primary" />
              <p>
                Never share payment PIN or OTP with anyone. Medica support will
                never ask for sensitive credentials.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
