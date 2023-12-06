
# Dashboard Configuration Language

This dashboard application allows you to configure pages using YAML. The configuration is parsed and rendered as a series of tiles with menus, groups, and badges. This document describes the YAML syntax for configuring the dashboard.

## YAML Structure

### Top-level properties:
- **group**: Defines a group of tiles. Each group can have multiple tiles and a distinct color.
- **tiles**: Defines the tiles shown in each group. Each tile represents a widget, service, or data card.

### Group Configuration

Each group has:
- **group**: The name of the group (e.g., `booking`, `payment`, `users`, `vehicles`).
- **color**: A color code (hex format) representing the group's visual theme.
- **tiles**: A list of tiles within the group.

Example:

```yaml
- group: booking
  color: "#99bbf2"
  tiles:
    - name: availability-api
      backends:
      - booking-api
      - user-management-api
      consumers:
      - booking-api
      menu:
      - name: availability Log
        link: http://link/availability-api
```

### Tile Configuration
Each tile defines a widget or service and can include:
- **name**: The name of the tile (e.g., `availability-api`, `payment-gateway-api`).
- **backends**: A list of backend services used by the tile.
- **consumers**: A list of services that consume this tile.
- **menu**: A list of menu items associated with the tile. Each menu item has:
  - **name**: The name of the menu item.
  - **link**: The URL the menu item links to (optional).

Example:

```yaml
    - name: availability-api
      backends:
      - booking-api
      - user-management-api
      consumers:
      - booking-api
      menu:
      - name: availability Log
        link: http://link/availability-api
      - name: item 1
```

### Badge Configuration
Badges provide additional information and visual markers on a tile. Badge types include:

- **text-badge**: Displays text-based badges with optional links.
  - **name**: The label for the badge (e.g., `Git Repo`).
  - **color**: Color of the badge.
  - **info**: A short description or tooltip (optional).
  - **items**: A list of items (e.g., `View Code`, `View PRS`) with associated links.

- **image-badge**: Displays an image as a badge.
  - **image**: The image filename.
  - **info**: A short description or tooltip.
  - **link**: A link associated with the image (optional).

- **hybrid-badge**: Combines text and image in a badge.
  - **image**: The image filename.
  - **info**: Tooltip text.
  - **items**: A list of associated items with links.

Example:

```yaml
      badges:
      - type: text-badge
        name: Git Repo
        color: "#3E8BFF"
        info: "hint message"
        items:
          - name: View Code
            link: https://github.com/availability-api
      - type: image-badge
        image: git.png
        info: "hint message"
        link: https://github.com/availability-api
```

## Full Example

```yaml
- group: booking
  color: "#99bbf2"
  tiles:
    - name: availability-api
      backends:
      - booking-api
      - user-management-api
      consumers:
      - booking-api 
      menu:
      - name: availability Log
        link: http://link/availability-api
      badges:
      - type: text-badge
        name: Git Repo
        color: "#3E8BFF"
        items:
          - name: View Code
            link: https://github.com/availability-api
- group: payment
  color: "#b1e0c9"
  tiles:
    - name: payment-gateway-api
      menu:
      - name: payment Log
        link: http://link/payment-gateway-api
      badges:
      - type: text-badge
        name: Git Repo
        color: "#3E8BFF"
        items:
          - name: View Code
            link: https://github.com/payment-gateway-api
```
