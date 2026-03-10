import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('/work/a.i-assistant-chatbot-telegram-serverles/breakingnews/2026_03_10/data_2026_03_10.csv')

plt.figure(figsize=(12, 8))
# Draw a simple world map background if geopandas is available, otherwise just scatter
try:
    import geopandas as gpd
    world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))
    ax = world.plot(color='lightgrey', edgecolor='white', figsize=(15, 10))
    scatter_ax = ax
except Exception:
    fig, scatter_ax = plt.subplots(figsize=(15, 10))
    # Draw simple grid if no map
    scatter_ax.grid(True, linestyle='--', alpha=0.5)

# Plot points
scatter = scatter_ax.scatter(df['lon'], df['lat'], 
                             s=df['impact'] * 100, # Buble size based on impact
                             c=df['importance'], # Color based on importance
                             cmap='viridis', 
                             alpha=0.6, edgecolors='w', linewidth=2)

# Annotate points
for i, row in df.iterrows():
    scatter_ax.annotate(row['location'], (row['lon'], row['lat']), 
                        xytext=(5, 5), textcoords='offset points', fontsize=10, weight='bold')

plt.colorbar(scatter, label='Importance')
plt.title('News Impact and Importance Map (2026-03-10)', fontsize=16)
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.tight_layout()
plt.savefig('/work/a.i-assistant-chatbot-telegram-serverles/breakingnews/2026_03_10/chart_impact_2026_03_10.png', dpi=300)
print('Map generated successfully.')
