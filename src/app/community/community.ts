import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-community',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './community.html',
})
export class Community {
  protected readonly benefits = [
    {
      icon: 'fa-solid fa-hand-holding-dollar',
      title: 'Earn from referrals',
      desc: 'Get rewarded every time someone joins and shops through your link.',
    },
    {
      icon: 'fa-solid fa-users',
      title: 'Grow your network',
      desc: 'Build a downline that spans multiple levels and earn as it grows.',
    },
    {
      icon: 'fa-solid fa-graduation-cap',
      title: 'Training & support',
      desc: 'Learn proven strategies from a community that wants you to win.',
    },
    {
      icon: 'fa-solid fa-award',
      title: 'Rewards & recognition',
      desc: 'Hit milestones and get recognized for your achievements.',
    },
  ];

  protected readonly steps = [
    { n: 1, title: 'Create your account', desc: 'Sign up for free in just a few minutes.' },
    {
      n: 2,
      title: 'Get your referral code',
      desc: 'Share your unique link with friends and family.',
    },
    { n: 3, title: 'Invite your network', desc: 'Grow your community across multiple levels.' },
    { n: 4, title: 'Start earning', desc: 'Earn as your network sells and grows.' },
  ];

  protected readonly stats = [
    { value: '10K+', label: 'Community members' },
    { value: '₱50M+', label: 'Rewards paid out' },
    { value: '4.8★', label: 'Member rating' },
  ];
}
