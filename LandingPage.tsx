import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground grid-bg">
      <Navbar />
      <Hero />
      
      {/* Features Section */}
      <section id="how-it-works" className="py-20 container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Science of the Perfect Shot</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We break down the biomechanics of cricket into data points, helping you replicate the technique of legends.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl">01</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Upload Video</h3>
                <p className="text-muted-foreground text-sm">Simply record your batting stance or shot from any smartphone. Side or front views work best.</p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl">02</span>
                </div>
                <h3 className="text-xl font-bold mb-2">AI Processing</h3>
                <p className="text-muted-foreground text-sm">Our neural engine maps 24 key body points and compares angles with our database of elite players.</p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl">03</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Rectification</h3>
                <p className="text-muted-foreground text-sm">Get visual feedback overlay on your skeleton showing exactly where to adjust your head, elbow, or feet.</p>
            </div>
        </div>
      </section>
    </div>
  );
}
