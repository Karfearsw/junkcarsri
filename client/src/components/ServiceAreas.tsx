const rhodeIslandCities = [
  "Barrington", "Bristol", "Burrillville", "Central Falls", "Charlestown",
  "Coventry", "Cranston", "Cumberland", "East Greenwich", "East Providence",
  "Exeter", "Foster", "Glocester", "Hopkinton", "Jamestown",
  "Johnston", "Lincoln", "Little Compton", "Middletown", "Narragansett",
  "Newport", "New Shoreham", "North Kingstown", "North Providence", "North Smithfield",
  "Pawtucket", "Portsmouth", "Providence", "Richmond", "Scituate",
  "Smithfield", "South Kingstown", "Tiverton", "Warren", "Warwick",
  "West Greenwich", "West Warwick", "Westerly", "Woonsocket",
];

export default function ServiceAreas() {
  return (
    <section className="py-12 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3" data-testid="text-service-areas-title">
              Serving All of Rhode Island
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-service-areas-subtitle">
              Free towing and pickup available in every city and town
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {rhodeIslandCities.map((city, index) => (
              <div 
                key={index}
                className="text-center p-3 rounded-md bg-background hover-elevate active-elevate-2"
                data-testid={`service-area-${city.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span className="text-sm font-medium">{city}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8" data-testid="text-service-areas-note">
            Don't see your town? We serve the entire state of Rhode Island. Call us at (401) 555-CASH
          </p>
        </div>
      </div>
    </section>
  );
}
