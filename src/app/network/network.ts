import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { ReferralService } from '../referrals/referral.service';
import { UserService } from '../users/user.service';
import { ReferralNode } from '../referrals/referral.model';

export interface TreeNode {
  id: string;
  name: string;
  username: string | null;
  level: number;
  children: TreeNode[];
}

@Component({
  selector: 'app-network',
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './network.html',
})
export class Network {
  private readonly referralService = inject(ReferralService);
  private readonly userService = inject(UserService);

  protected readonly currentUser = this.userService.currentUser;
  protected readonly tree = signal<TreeNode | null>(null);
  protected readonly totalCount = signal(0);
  protected readonly maxDepth = signal(0);

  ngOnInit() {
    this.referralService.downline().subscribe((d) => {
      this.totalCount.set(d.totalCount);
      this.maxDepth.set(d.maxDepth);
      this.tree.set(this.buildTree(d.members));
    });
  }

  /** Turn the flat downline list (each with a sponsorId) into a tree rooted at the current user. */
  private buildTree(members: ReferralNode[]): TreeNode | null {
    const me = this.currentUser();
    if (!me) {
      return null;
    }

    const childrenBySponsor = new Map<string, ReferralNode[]>();
    for (const member of members) {
      const key = member.sponsorId ?? '';
      const list = childrenBySponsor.get(key) ?? [];
      list.push(member);
      childrenBySponsor.set(key, list);
    }

    const build = (id: string, name: string, username: string | null, level: number): TreeNode => ({
      id,
      name,
      username,
      level,
      children: (childrenBySponsor.get(id) ?? []).map((child) =>
        build(child.id, `${child.firstName} ${child.lastName}`, child.username, child.level),
      ),
    });

    return build(me.id, `${me.firstName} ${me.lastName}`, me.username, 0);
  }
}
