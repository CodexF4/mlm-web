import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './footer.html',
})
export class Footer {
  // Some links point to pages that don't exist yet — they land on the
  // in-development placeholder (wildcard route) until built.
  protected readonly columns = [
    {
      title: 'Customer Service',
      links: [
        { label: 'Help Center', path: '/help' },
        { label: 'How to Buy', path: '/how-to-buy' },
        { label: 'Shipping Info', path: '/shipping' },
        { label: 'Returns & Refunds', path: '/returns' },
        { label: 'Contact Us', path: '/contact' },
      ],
    },
    {
      title: 'About Pag-Unlad',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Careers', path: '/careers' },
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms & Conditions', path: '/terms' },
      ],
    },
    {
      title: 'Earn With Us',
      links: [
        { label: 'Join Our Community', path: '/community' },
        { label: 'Earn from Referral', path: '/earn' },
        { label: 'Membership Plans', path: '/register' },
        { label: 'Referral Program', path: '/referrals' },
        { label: 'Seller Center', path: '/seller-center' },
      ],
    },
    {
      title: 'My Account',
      links: [
        { label: 'Sign Up', path: '/register' },
        { label: 'Login', path: '/login' },
        { label: 'My Network', path: '/network' },
        { label: 'My Cart', path: '/cart' },
        { label: 'Order History', path: '/orders' },
      ],
    },
  ];
}
