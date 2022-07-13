export interface Address {
  /**
   * The country/region of the origin location from where the package is
   * picked up by the carrier to be delivered to the final destination.
   * Use 3 letters of ISO 3166-1 country/region code.
   */
  country?: string;

  /**
   * State, province, or the equivalent location of the origin address.
   * Either `origin_address.state` or `origin_address.postal_code` is required.
   */
  state?: string;

  /**
   * City of the origin address.
   */
  city?: string;

  /**
   * Postal code of the origin address.
   * Either `origin_address.state` or `origin_address.postal_code` is required.
   */
  postal_code?: string;

  /**
   * Raw location of the origin address.
   * A raw address will help AI to identify the accurate location of the origin address.
   */
  raw_location?: string;
}
