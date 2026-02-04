# API Integration Tracking & PR Merge Plan

**Plan ID**: api-integration-pr-merge
**Created**: 2026-02-03
**Planner**: Prometheus
**Executor**: Sisyphus

---

## 1. Project Context

**Situation**: 3 PRs on dev branch need processing before merge:

- **PR #4**: V-3 Part Selection (Draft) - has mock data
- **PR #5**: V-8 Draco Loader (Ready) - no API dependency
- **PR #11**: S-2 LocalStorage (Ready) - no API dependency

**Goal**: Add API integration tracking for mock data, create GitHub issues, update PR descriptions, and merge all 3 PRs to dev.

**Timeline**: Single session execution
**Priority**: High (blocks dev branch progress)

---

## 2. Requirements Summary

### Functional Requirements

1. **Inline TODO Comments**: Add to code files where mock data is used
2. **GitHub Issues**: Create parent epic + child issues for API tracking
3. **PR Descriptions**: Update all 3 PRs with API integration status
4. **PR Status**: Mark PR #4 as Ready for review
5. **Merge**: Squash and merge all 3 PRs to dev branch

### Non-Functional Requirements

- All commits must follow conventional commit format
- PR descriptions must be in Korean (existing style)
- Issue titles in Korean, body bilingual (KR + EN)
- No breaking changes to existing functionality

---

## 3. Current State Analysis

### PR #4 (V-3 Part Selection)

**Status**: Draft
**Mock Data Locations**:

- `src/lib/mock-data.ts` - Mock part data (Crankshaft, Piston, ConnectingRod)
- `src/components/panels/PartInfoPanel.tsx` - Consumes mock data via `getPartByMeshName()`

**API Integration Needed**:

- Backend endpoint: `GET /api/parts?meshName={meshName}`
- Service layer: `src/lib/api/parts.ts`
- Async data fetching with loading states

**Existing TODOs**: Already present in `mock-data.ts` but not in usage points

### PR #5 (V-8 Draco Loader)

**Status**: Ready
**Mock Data**: None
**API Integration**: Not required (pure optimization)

### PR #11 (S-2 LocalStorage)

**Status**: Ready
**Mock Data**: None
**API Integration**: Not required (pure frontend state)

---

## 4. Implementation Plan

### Phase 1: Code Analysis & TODO Addition (PR #4 only)

**Step 1.1**: Checkout PR #4 branch

```bash
git checkout feature/v3-part-selection
git pull origin feature/v3-part-selection
```

**Step 1.2**: Add inline TODO comments in PartInfoPanel.tsx

Location: `src/components/panels/PartInfoPanel.tsx:4-5`
Add after imports:

```typescript
/**
 * TODO: Replace mock data with API integration - Track: #<parent-issue>
 * - Implement async fetchPartByMeshName() from @/lib/api/parts
 * - Wrap component in Suspense for loading state
 * - Add error boundary for API failures
 * - Related issue: #<child-issue-v3>
 */
```

**Step 1.3**: Build & verify no errors

```bash
pnpm build
pnpm lint
```

**Step 1.4**: Commit changes

```bash
git add src/components/panels/PartInfoPanel.tsx
git commit -m "docs(viewer): add API integration TODO for part info panel"
git push origin feature/v3-part-selection
```

### Phase 2: GitHub Issues Creation

**Step 2.1**: Create parent epic issue

**Issue Template**:

```
Title: [Epic] API Integration Tracking
Labels: enhancement, api, tracking
Assignees: (none)

Body:
## 개요 (Overview)

Mock 데이터를 사용 중인 기능들에 대한 API 연동 추적 Epic 이슈입니다.

This epic tracks API integration for features currently using mock data.

## 하위 작업 (Subtasks)

- [ ] #<issue-v3> - V-3 Part Selection API 연동

## 완료 조건 (Acceptance Criteria)

- [ ] 모든 mock 데이터가 실제 API 호출로 대체됨
- [ ] API 서비스 레이어 구현 완료 (`src/lib/api/`)
- [ ] 에러 처리 및 로딩 상태 UI 추가
- [ ] 모든 하위 이슈 완료

## 참고 사항 (Notes)

- Backend API 개발 후 진행
- API 스펙은 별도 문서화 필요
```

**Step 2.2**: Create child issue for V-3

**Issue Template**:

```
Title: V-3 Part Selection API 연동
Labels: enhancement, api, viewer
Assignees: (none)

Body:
## 개요 (Overview)

부품 선택 기능의 mock 데이터를 실제 API로 대체합니다.

Replace mock data in part selection feature with actual API calls.

## 현재 상태 (Current State)

**Mock 데이터 위치**:
- `src/lib/mock-data.ts` - mockParts, getPartByMeshName()
- `src/components/panels/PartInfoPanel.tsx` - Mock 데이터 소비

**Mock 데이터 예시**:
- Crankshaft (id: 1)
- Piston (id: 2)
- ConnectingRod (id: 3)

## 작업 내용 (Tasks)

- [ ] Backend API 엔드포인트 구현
  - `GET /api/parts?meshName={meshName}`
  - Response: Part 타입 (TypeScript interface 참고)
- [ ] Frontend API 서비스 레이어 생성
  - 파일: `src/lib/api/parts.ts`
  - 함수: `async fetchPartByMeshName(meshName: string): Promise<Part | undefined>`
- [ ] PartInfoPanel 컴포넌트 수정
  - `getPartByMeshName()` → `fetchPartByMeshName()` (async)
  - Suspense로 감싸기 (loading state)
  - 에러 처리 추가
- [ ] Mock 데이터 제거
  - `src/lib/mock-data.ts` 파일 삭제
  - Import 정리
- [ ] 테스트
  - API 연동 정상 작동 확인
  - 로딩 상태 UI 확인
  - 에러 케이스 처리 확인

## 완료 조건 (Acceptance Criteria)

- [ ] 부품 클릭 시 실제 API에서 데이터 로드
- [ ] Mock 데이터 완전 제거
- [ ] 로딩 상태 표시 (Suspense fallback)
- [ ] 에러 시 적절한 메시지 표시
- [ ] Build & type-check 통과

## 참고 (References)

- 관련 PR: #4
- Parent epic: #<parent-issue>
- 타입 정의: `src/types/model.ts` - Part interface
```

**Step 2.3**: Execute issue creation

```bash
gh issue create --title "[Epic] API Integration Tracking" \
  --label "enhancement,api,tracking" \
  --body-file <(cat <<EOF
<parent issue body>
EOF
)

gh issue create --title "V-3 Part Selection API 연동" \
  --label "enhancement,api,viewer" \
  --body-file <(cat <<EOF
<child issue body with parent link>
EOF
)
```

**Step 2.4**: Update parent issue with child link

### Phase 3: PR Descriptions Update

**Step 3.1**: Update PR #4 description

Add new section after "## Test Plan":

```markdown
## API Integration Status

**Current State**: Mock data
**Tracking Issue**: #<parent-issue>
**Next Steps**: #<child-issue-v3>

### Mock Data Details

- **File**: `src/lib/mock-data.ts`
- **Usage**: `src/components/panels/PartInfoPanel.tsx`
- **Mock Parts**: Crankshaft, Piston, ConnectingRod (3개)

### Migration Path

1. Backend API 개발: `GET /api/parts?meshName={meshName}`
2. Frontend 서비스 레이어: `src/lib/api/parts.ts`
3. Async 데이터 로딩 + Suspense
4. Mock 데이터 제거

**Note**: Mock 상태로 머지, API 연동은 #<child-issue-v3>에서 진행
```

Execute:

```bash
gh pr edit 4 --body "<updated body with new section>"
```

**Step 3.2**: Update PR #5 description

Add new section after "## Next Steps":

```markdown
## API Integration Status

**API Required**: No
**Reason**: Pure optimization (Draco compression), no data fetching needed

This PR is ready to merge without API dependencies.
```

**Step 3.3**: Update PR #11 description

Add new section after "## Follow-up Issues":

```markdown
## API Integration Status

**API Required**: No
**Reason**: Pure frontend state management (LocalStorage), no backend dependencies

This PR is ready to merge without API dependencies.
```

### Phase 4: PR Status & Merge

**Step 4.1**: Mark PR #4 as Ready

```bash
gh pr ready 4
```

**Step 4.2**: Verify all PRs are Ready

```bash
gh pr list --state open --json number,title,isDraft
```

Expected: All 3 PRs with `isDraft: false`

**Step 4.3**: Merge PRs to dev (sequential, squash merge)

```bash
# PR #4 - V-3 Part Selection
gh pr merge 4 --squash --delete-branch --body "Mock 상태로 머지, API 연동은 #<child-issue-v3>에서 진행"

# PR #5 - V-8 Draco Loader
gh pr merge 5 --squash --delete-branch

# PR #11 - S-2 LocalStorage
gh pr merge 11 --squash --delete-branch
```

**Step 4.4**: Verify dev branch state

```bash
git checkout dev
git pull origin dev
git log --oneline -5
```

Expected: 3 new squash commits on dev

**Step 4.5**: Cleanup local branches (if exists)

```bash
git branch -d feature/v3-part-selection 2>/dev/null || true
git branch -d feature/v8-draco-optimization 2>/dev/null || true
git branch -d feature/s2-state-persistence 2>/dev/null || true
```

---

## 5. File References

### Files to Modify

- `src/components/panels/PartInfoPanel.tsx` - Add TODO comment (lines 4-5)

### Files to Reference (no changes)

- `src/lib/mock-data.ts` - Mock data location (already has TODOs)
- `src/components/viewer/Model.tsx` - Part selection logic
- `src/types/model.ts` - Part type definition

### GitHub Objects

- PR #4: https://github.com/<user>/<repo>/pull/4
- PR #5: https://github.com/<user>/<repo>/pull/5
- PR #11: https://github.com/<user>/<repo>/pull/11
- New parent issue: `#<parent-issue>` (to be created)
- New child issue: `#<child-issue-v3>` (to be created)

---

## 6. Acceptance Criteria

### Must Have

- [x] PR #4 has inline TODO comment in PartInfoPanel.tsx
- [x] Parent epic issue created with proper labels
- [x] Child issue created for V-3 API integration
- [x] All 3 PR descriptions updated with API status section
- [x] PR #4 marked as Ready (not Draft)
- [x] All 3 PRs merged to dev with squash commits
- [x] Local branches cleaned up
- [x] No build errors or lint issues

### Should Have

- [x] Issue descriptions are bilingual (KR + EN)
- [x] Commit messages follow conventional format
- [x] PR merge messages reference tracking issues

### Nice to Have

- [ ] Add issue labels for priority/difficulty
- [ ] Add issue milestones (if applicable)
- [ ] Update project board (if exists)

---

## 7. Risks & Mitigations

### Risk 1: PR Merge Conflicts

**Probability**: Medium
**Impact**: Medium
**Mitigation**: Merge in order (oldest first), resolve conflicts manually
**Contingency**: Use `git merge --squash` if `gh pr merge` fails

### Risk 2: PR #4 Still Has Failing Checks

**Probability**: Low
**Impact**: High (blocks merge)
**Mitigation**: Run `pnpm build && pnpm lint` before marking Ready
**Contingency**: Fix issues and push before merging

### Risk 3: Issue Creation Fails (gh CLI auth)

**Probability**: Low
**Impact**: Medium
**Mitigation**: Verify `gh auth status` before starting
**Contingency**: Create issues manually via GitHub UI

### Risk 4: Squash Merge Loses Important Commit History

**Probability**: Low
**Impact**: Low
**Mitigation**: PR descriptions already contain detailed changelogs
**Contingency**: Individual commits are still accessible via PR page

---

## 8. Verification Steps

### Pre-Execution Checklist

- [ ] Git status clean on dev branch
- [ ] `gh auth status` shows authenticated user
- [ ] All 3 PR branches exist on remote
- [ ] No active PR reviews blocking merge

### Post-Execution Verification

**Step 1**: Verify inline TODO comments

```bash
git show origin/feature/v3-part-selection:src/components/panels/PartInfoPanel.tsx | grep -A5 "TODO"
```

Expected: TODO comment visible with issue references

**Step 2**: Verify GitHub issues created

```bash
gh issue list --label api --json number,title,state
```

Expected: 2 issues (1 epic + 1 child) in OPEN state

**Step 3**: Verify PR descriptions updated

```bash
gh pr view 4 --json body --jq '.body' | grep "API Integration Status"
gh pr view 5 --json body --jq '.body' | grep "API Integration Status"
gh pr view 11 --json body --jq '.body' | grep "API Integration Status"
```

Expected: All 3 PRs have "API Integration Status" section

**Step 4**: Verify PR #4 marked Ready

```bash
gh pr view 4 --json isDraft --jq '.isDraft'
```

Expected: `false`

**Step 5**: Verify PRs merged

```bash
gh pr list --state merged --json number,title --limit 3
```

Expected: PRs #4, #5, #11 in MERGED state

**Step 6**: Verify dev branch commits

```bash
git log --oneline origin/dev -3
```

Expected: 3 new squash commits

**Step 7**: Verify branches deleted on remote

```bash
git ls-remote --heads origin | grep -E "(v3-part|v8-draco|s2-state)"
```

Expected: No output (branches deleted)

### Success Metrics

- **Code Quality**: No lint errors, build succeeds
- **Documentation**: All PRs have clear API status
- **Traceability**: Issues linked to PRs and code comments
- **Git Hygiene**: Clean squash commits, branches deleted

---

## 9. Rollback Plan

If issues arise post-merge:

### Rollback PR Merges

```bash
# Find merge commit hashes
git log --oneline origin/dev -3

# Revert in reverse order (last merged first)
git checkout dev
git revert <commit-hash-PR11> --no-edit
git revert <commit-hash-PR5> --no-edit
git revert <commit-hash-PR4> --no-edit
git push origin dev
```

### Rollback Issue Creation

- Close issues with comment: "Rolled back due to plan change"
- Issues remain for historical reference

### Re-open PRs

- Recreate branches from their original commits
- Push to remote and recreate PRs manually

---

## 10. Post-Merge Actions

### Immediate

- [ ] Notify team in Slack/Discord (if applicable)
- [ ] Update project board (move cards to "Ready for API")
- [ ] Document merge in changelog (if maintained)

### Follow-up

- [ ] Schedule backend API development
- [ ] Update API documentation with required endpoints
- [ ] Plan API integration sprint (reference #<parent-issue>)

---

## Notes

- All 3 PRs will be merged with mock data intact (intentional)
- API integration will happen in future sprints
- This plan focuses on documentation and tracking, not implementation
- Squash merge chosen for clean dev history (1 commit per feature)

---

**Plan Status**: READY FOR EXECUTION
**Estimated Duration**: 20-30 minutes
**Executor Instructions**: Run with `/sisyphus` or execute phases sequentially
